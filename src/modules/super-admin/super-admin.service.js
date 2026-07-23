const prisma = require('../../config/db');
const bcrypt = require('bcryptjs');

/**
 * Super Admin Dashboard KPIs & Lists
 */
exports.getDashboard = async () => {
  const [totalAgencies, activeOffices, totalUsers, totalActiveUsers] = await Promise.all([
    prisma.agency.count({ where: { is_deleted: false } }),
    prisma.office.count({ where: { status: 'active', is_deleted: false } }),
    prisma.user.count({ where: { is_active: true } }),
    prisma.user.count({ where: { is_active: true } }), // Simplified representation of active platform users
  ]);

  // Fetch recent registered agencies (last 5)
  const recentAgencies = await prisma.agency.findMany({
    where: { is_deleted: false },
    orderBy: { created_at: 'desc' },
    take: 5,
  });

  // Fetch recent system-wide activity logs (last 5)
  const recentActivities = await prisma.activity.findMany({
    where: { matter_id: null },
    include: {
      actor: {
        select: {
          id: true,
          full_name: true,
          email: true,
          role: true
        }
      }
    },
    orderBy: { created_at: 'desc' },
    take: 5,
  });

  // Calculate subscription rate (active subscriptions / total subscriptions)
  const activeSubs = await prisma.agency.count({ where: { status: 'active', is_deleted: false } });
  const totalSubs = await prisma.agency.count({ where: { is_deleted: false } });
  const subscriptionRate = totalSubs > 0 ? ((activeSubs / totalSubs) * 100).toFixed(1) : "0.0";

  return {
    kpis: {
      totalAgencies,
      activeOffices,
      totalUsers,
      subscriptionRate
    },
    recentAgencies,
    recentActivities: recentActivities.map(log => {
      let descObj = {};
      try {
        descObj = JSON.parse(log.description || '{}');
      } catch (e) {
        descObj = { message: log.description };
      }
      return {
        id: log.id,
        actor: log.actor?.full_name || 'System',
        role: log.actor?.role || 'admin',
        action: log.action,
        module: log.entity_type,
        timestamp: log.created_at,
        severity: descObj.severity || 'low',
        message: descObj.message || log.description
      };
    })
  };
};

/**
 * Log a system activity
 */
const logSystemActivity = async (actorId, entityType, entityId, action, descriptionObj) => {
  try {
    await prisma.activity.create({
      data: {
        matter_id: null,
        actor_user_id: actorId,
        entity_type: entityType,
        entity_id: entityId,
        action,
        description: JSON.stringify(descriptionObj)
      }
    });
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
};

/**
 * Agencies CRUD
 */
exports.listAgencies = async (filters) => {
  const { q, status, page = 1, limit = 50, sortBy = 'created_at', sortOrder = 'desc' } = filters;
  const where = { is_deleted: false };

  if (status && status !== 'all') {
    where.status = status;
  }

  if (q) {
    where.OR = [
      { name: { contains: q } },
      { owner: { contains: q } },
      { email: { contains: q } }
    ];
  }

  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  const take = parseInt(limit, 10);

  const [items, total] = await Promise.all([
    prisma.agency.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take,
      include: {
        _count: {
          select: { offices: true, users: true }
        }
      }
    }),
    prisma.agency.count({ where })
  ]);

  return { items, total, page: parseInt(page, 10), limit: parseInt(limit, 10) };
};

exports.createAgency = async (actorId, data) => {
  const agency = await prisma.agency.create({
    data: {
      name: data.name,
      owner: data.owner,
      email: data.email,
      phone: data.phone,
      plan: data.plan || 'Professional',
      status: data.status || 'active',
      subscription_amount: data.subscription_amount || 0.00,
      billing_cycle: data.billing_cycle || 'monthly',
      next_billing: data.next_billing ? new Date(data.next_billing) : new Date(),
    }
  });

  await logSystemActivity(actorId, 'Agency', agency.id, 'CREATE', {
    message: `Created agency ${agency.name}`,
    severity: 'medium'
  });

  return agency;
};

exports.updateAgency = async (actorId, id, data) => {
  const oldAgency = await prisma.agency.findUnique({ where: { id: parseInt(id, 10) } });
  if (!oldAgency) throw new Error('Agency not found');

  const agency = await prisma.agency.update({
    where: { id: parseInt(id, 10) },
    data: {
      name: data.name,
      owner: data.owner,
      email: data.email,
      phone: data.phone,
      plan: data.plan,
      status: data.status,
      subscription_amount: data.subscription_amount,
      billing_cycle: data.billing_cycle,
      next_billing: data.next_billing ? new Date(data.next_billing) : undefined,
    }
  });

  await logSystemActivity(actorId, 'Agency', agency.id, 'UPDATE', {
    message: `Updated agency ${agency.name}`,
    old_values: { name: oldAgency.name, plan: oldAgency.plan, status: oldAgency.status },
    new_values: { name: agency.name, plan: agency.plan, status: agency.status },
    severity: 'medium'
  });

  return agency;
};

exports.deleteAgency = async (actorId, id) => {
  const agencyId = parseInt(id, 10);
  const agency = await prisma.agency.findUnique({
    where: { id: agencyId },
    include: {
      _count: {
        select: { users: true }
      }
    }
  });

  if (!agency) throw new Error('Agency not found');
  
  // Guard check: Prevent delete if matters or users are assigned to this agency context
  const usersCount = await prisma.user.count({ where: { agency_id: agencyId, is_active: true } });
  if (usersCount > 0) {
    throw new Error('Cannot delete agency with active users. Please deactivate users first.');
  }

  const updated = await prisma.agency.update({
    where: { id: agencyId },
    data: {
      is_deleted: true,
      deleted_at: new Date(),
      status: 'inactive'
    }
  });

  await logSystemActivity(actorId, 'Agency', agencyId, 'DEACTIVATE', {
    message: `Soft-deleted agency ${agency.name}`,
    severity: 'high'
  });

  return updated;
};

/**
 * Offices CRUD
 */
exports.listOffices = async (filters) => {
  const { q, status, page = 1, limit = 50, sortBy = 'created_at', sortOrder = 'desc' } = filters;
  const where = { is_deleted: false };

  if (status && status !== 'all') {
    where.status = status;
  }

  if (q) {
    where.OR = [
      { name: { contains: q } },
      { city: { contains: q } }
    ];
  }

  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  const take = parseInt(limit, 10);

  const [items, total] = await Promise.all([
    prisma.office.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take,
      include: {
        agency: {
          select: { id: true, name: true }
        }
      }
    }),
    prisma.office.count({ where })
  ]);

  return { items, total, page: parseInt(page, 10), limit: parseInt(limit, 10) };
};

exports.createOffice = async (actorId, data) => {
  const office = await prisma.office.create({
    data: {
      name: data.name,
      agency_id: parseInt(data.agency_id || data.agencyId, 10),
      city: data.city,
      status: data.status || 'active',
    }
  });

  await logSystemActivity(actorId, 'Office', office.id, 'CREATE', {
    message: `Created office ${office.name}`,
    severity: 'medium'
  });

  return office;
};

exports.updateOffice = async (actorId, id, data) => {
  const officeId = parseInt(id, 10);
  const oldOffice = await prisma.office.findUnique({ where: { id: officeId } });
  if (!oldOffice) throw new Error('Office not found');

  const office = await prisma.office.update({
    where: { id: officeId },
    data: {
      name: data.name,
      agency_id: data.agency_id ? parseInt(data.agency_id, 10) : undefined,
      city: data.city,
      status: data.status,
    }
  });

  await logSystemActivity(actorId, 'Office', office.id, 'UPDATE', {
    message: `Updated office ${office.name}`,
    old_values: { name: oldOffice.name, status: oldOffice.status },
    new_values: { name: office.name, status: office.status },
    severity: 'low'
  });

  return office;
};

exports.deleteOffice = async (actorId, id) => {
  const officeId = parseInt(id, 10);
  const office = await prisma.office.findUnique({ where: { id: officeId } });
  if (!office) throw new Error('Office not found');

  const updated = await prisma.office.update({
    where: { id: officeId },
    data: {
      is_deleted: true,
      deleted_at: new Date(),
      status: 'inactive'
    }
  });

  await logSystemActivity(actorId, 'Office', officeId, 'DEACTIVATE', {
    message: `Soft-deleted office ${office.name}`,
    severity: 'medium'
  });

  return updated;
};

/**
 * Users CRUD (Platform-wide)
 */
exports.listUsers = async (filters) => {
  const { q, role, status, page = 1, limit = 50, sortBy = 'created_at', sortOrder = 'desc' } = filters;
  const where = {};

  if (status && status !== 'all') {
    where.is_active = status === 'active';
  }

  if (role && role !== 'all') {
    where.roles = {
      some: {
        role: role.toLowerCase()
      }
    };
  } else {
    // Default Super Admin User Directory view to ONLY Agency Administrators
    where.roles = {
      some: {
        role: { in: ['admin', 'agency_admin'] }
      }
    };
  }

  if (q) {
    where.OR = [
      { full_name: { contains: q } },
      { email: { contains: q } }
    ];
  }

  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  const take = parseInt(limit, 10);

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take,
      include: {
        agency: {
          select: { id: true, name: true }
        },
        roles: true
      }
    }),
    prisma.user.count({ where })
  ]);

  return {
    items: users.map(u => ({
      id: u.id,
      name: u.full_name,
      email: u.email,
      role: u.roles.length > 0 ? u.roles.map(r => r.role).join(', ') : u.role,
      agency: u.agency?.name || 'System',
      status: u.is_active ? 'active' : 'inactive',
      created_at: u.created_at
    })),
    total,
    page: parseInt(page, 10),
    limit: parseInt(limit, 10)
  };
};

exports.createUser = async (actorId, data) => {
  const passwordHash = await bcrypt.hash(data.password || '1234', 10);
  const agencyId = data.agency_id ? parseInt(data.agency_id, 10) : 1;
  const roleStr = (data.role || 'lawyer').toLowerCase();

  let baseRoleEnum = 'admin';
  if (roleStr === 'client') baseRoleEnum = 'client';
  else if (['lawyer', 'partner', 'paralegal'].includes(roleStr)) baseRoleEnum = 'lawyer';

  const user = await prisma.user.create({
    data: {
      full_name: data.name,
      email: data.email,
      password_hash: passwordHash,
      agency_id: agencyId,
      office_id: data.office_id ? parseInt(data.office_id, 10) : null,
      role: baseRoleEnum,
      is_active: data.status === 'active'
    }
  });

  // Seed mapped role in user_roles table
  await prisma.userRole.create({
    data: {
      user_id: user.id,
      role: roleStr
    }
  });

  // If Lawyer, Partner, or Paralegal, ensure a Lawyer profile exists for agency attorney workflows
  if (['lawyer', 'partner', 'paralegal'].includes(roleStr)) {
    await prisma.lawyer.upsert({
      where: { user_id: user.id },
      update: { display_name: user.full_name },
      create: { user_id: user.id, display_name: user.full_name }
    });
  }

  // If Client role, ensure a Client entity profile exists linked to the specific agency
  if (roleStr === 'client') {
    await prisma.client.upsert({
      where: { user_id: user.id },
      update: { agency_id: agencyId, full_name: user.full_name, email: user.email },
      create: {
        user_id: user.id,
        agency_id: agencyId,
        full_name: user.full_name,
        email: user.email,
        party_role: 'Client',
        party_type: 'Individual'
      }
    });
  }

  await logSystemActivity(actorId, 'User', user.id, 'CREATE', {
    message: `Created user ${user.full_name} (${roleStr}) for agency ID ${agencyId}`,
    severity: 'medium'
  });

  return user;
};

exports.updateUser = async (actorId, id, data) => {
  const userId = parseInt(id, 10);
  const oldUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!oldUser) throw new Error('User not found');

  const agencyId = data.agency_id ? parseInt(data.agency_id, 10) : oldUser.agency_id;
  const roleStr = data.role ? data.role.toLowerCase() : null;

  let baseRoleEnum = undefined;
  if (roleStr) {
    if (roleStr === 'client') baseRoleEnum = 'client';
    else if (['lawyer', 'partner', 'paralegal'].includes(roleStr)) baseRoleEnum = 'lawyer';
    else baseRoleEnum = 'admin';
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      full_name: data.name || undefined,
      email: data.email || undefined,
      agency_id: agencyId,
      office_id: data.office_id ? parseInt(data.office_id, 10) : (data.office_id === null ? null : undefined),
      role: baseRoleEnum,
      is_active: data.status ? (data.status === 'active') : undefined
    }
  });

  // Re-map role if changed
  if (roleStr) {
    await prisma.userRole.deleteMany({ where: { user_id: userId } });
    await prisma.userRole.create({
      data: {
        user_id: userId,
        role: roleStr
      }
    });

    if (['lawyer', 'partner', 'paralegal'].includes(roleStr)) {
      await prisma.lawyer.upsert({
        where: { user_id: userId },
        update: { display_name: user.full_name },
        create: { user_id: userId, display_name: user.full_name }
      });
    }

    if (roleStr === 'client') {
      await prisma.client.upsert({
        where: { user_id: userId },
        update: { agency_id: agencyId, full_name: user.full_name, email: user.email },
        create: {
          user_id: userId,
          agency_id: agencyId,
          full_name: user.full_name,
          email: user.email,
          party_role: 'Client',
          party_type: 'Individual'
        }
      });
    }
  }

  await logSystemActivity(actorId, 'User', user.id, 'UPDATE', {
    message: `Updated user profile ${user.full_name}`,
    severity: 'medium'
  });

  return user;
};

exports.deleteUser = async (actorId, id) => {
  const userId = parseInt(id, 10);
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      is_active: false
    }
  });

  await logSystemActivity(actorId, 'User', userId, 'DEACTIVATE', {
    message: `Deactivated user account ${user.full_name}`,
    severity: 'high'
  });

  return updated;
};

/**
 * Activity Logs List
 */
exports.listActivityLogs = async (filters) => {
  const { page = 1, limit = 50, severity } = filters;
  const where = { matter_id: null };

  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  const take = parseInt(limit, 10);

  const [logs, total] = await Promise.all([
    prisma.activity.findMany({
      where,
      orderBy: { created_at: 'desc' },
      skip,
      take,
      include: {
        actor: {
          select: { id: true, full_name: true, email: true, role: true }
        }
      }
    }),
    prisma.activity.count({ where })
  ]);

  const items = logs.map(log => {
    let descObj = {};
    try {
      descObj = JSON.parse(log.description || '{}');
    } catch (e) {
      descObj = { message: log.description };
    }
    return {
      id: log.id,
      actor: log.actor?.full_name || 'System',
      role: log.actor?.role || 'admin',
      action: log.action,
      module: log.entity_type,
      timestamp: log.created_at,
      severity: descObj.severity || 'low',
      message: descObj.message || log.description
    };
  });

  // Filter in memory for severity if specified
  const filteredItems = severity && severity !== 'all'
    ? items.filter(i => i.severity.toLowerCase() === severity.toLowerCase())
    : items;

  return { items: filteredItems, total, page: parseInt(page, 10), limit: parseInt(limit, 10) };
};

/**
 * Settings CRUD
 */
exports.getSettings = async () => {
  const keys = ['defaultSystemLanguage', 'allowNewRegistrations', 'maintenanceMode', 'backupFrequency'];
  const settings = await prisma.setting.findMany({
    where: { key: { in: keys } }
  });
  
  const result = {
    defaultSystemLanguage: 'en',
    allowNewRegistrations: true,
    maintenanceMode: false,
    backupFrequency: 'daily'
  };

  settings.forEach(s => {
    let val = s.value;
    if (val === 'true') val = true;
    if (val === 'false') val = false;
    result[s.key] = val;
  });

  return result;
};

exports.updateSettings = async (actorId, data) => {
  const entries = Object.entries(data);
  for (const [key, value] of entries) {
    await prisma.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) }
    });
  }

  await logSystemActivity(actorId, 'Settings', 0, 'UPDATE', {
    message: 'Updated Super Admin platform preferences settings',
    severity: 'medium'
  });

  return true;
};
