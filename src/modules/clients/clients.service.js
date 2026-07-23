const prisma = require('../../config/db');
const bcrypt = require('bcryptjs');

const getAll = async (query, user) => {
  const { page = 1, limit = 100 } = query;
  const take = parseInt(limit);
  const skip = (parseInt(page) - 1) * take;

  const userRoles = (user?.roles || []).map(r => String(r).toLowerCase());
  const isStaff = userRoles.some(r => ['admin', 'lawyer', 'partner', 'paralegal', 'super_admin'].includes(r)) || ['admin', 'lawyer'].includes(user?.role);

  const where = {};
  if (user?.agency_id && !userRoles.includes('super_admin')) {
    where.agency_id = parseInt(user.agency_id, 10);
  }

  if (userRoles.includes('client') && !isStaff) {
    where.user_id = user.id;
  }

  return await prisma.client.findMany({
    where,
    skip,
    take,
    include: {
      _count: {
        select: { matters: true }
      }
    },
    orderBy: { created_at: 'desc' },
  });
};

const getById = async (id, user) => {
  const client = await prisma.client.findUnique({ 
    where: { id: parseInt(id) },
    include: {
      matters: true,
      user: {
        select: { id: true, email: true, role: true, is_active: true }
      }
    }
  });
  if (!client) return null;

  const userRoles = (user?.roles || []).map(r => String(r).toLowerCase());
  if (userRoles.includes('client') && client.user_id !== user.id) {
    const err = new Error('Not authorized to access this client profile');
    err.statusCode = 403;
    throw err;
  }
  return client;
};

const create = async (data, user) => {
  const userRoles = (user?.roles || []).map(r => String(r).toLowerCase());
  const canCreate = userRoles.some(r => ['admin', 'lawyer', 'partner', 'super_admin'].includes(r)) || ['admin', 'lawyer'].includes(user?.role);

  if (!canCreate) {
    const err = new Error('Not authorized to create clients');
    err.statusCode = 403;
    throw err;
  }

  const { email, full_name, password, party_type, party_role, organization_name, contact_first_name, contact_last_name, business_address, home_address, agency_id, ...rest } = data;
  const targetAgencyId = agency_id ? parseInt(agency_id, 10) : (user?.agency_id ? parseInt(user.agency_id, 10) : 1);

  // 1. Check if user already exists
  let targetUser = await prisma.user.findUnique({ where: { email } });

  if (!targetUser) {
    // 2. Create new user with provided password or default '1234'
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password || '1234', salt);

    targetUser = await prisma.user.create({
      data: {
        email,
        full_name,
        password_hash,
        agency_id: targetAgencyId,
        role: 'client',
        must_reset_password: true,
      }
    });

    await prisma.userRole.create({
      data: { user_id: targetUser.id, role: 'client' }
    });
  }

  // 3. Create client linked to user and agency
  return await prisma.client.create({
    data: {
      email,
      full_name,
      party_type: party_type || 'Individual',
      party_role: party_role || 'Client',
      organization_name: organization_name || null,
      contact_first_name: contact_first_name || null,
      contact_last_name: contact_last_name || null,
      business_address: business_address || null,
      home_address: home_address || null,
      agency_id: targetAgencyId,
      user_id: targetUser.id,
      ...rest,
    },
    include: {
      user: {
        select: { id: true, email: true, role: true }
      }
    }
  });
};

const update = async (id, data, user) => {
  const existing = await prisma.client.findUnique({
    where: { id: parseInt(id, 10) },
    include: { matters: true },
  });
  if (!existing) {
    const err = new Error('Client not found');
    err.statusCode = 404;
    throw err;
  }
  if (user?.role === 'lawyer') {
    const hasAssigned = (existing.matters || []).some((m) => m.assigned_lawyer_id === user.id);
    if (!hasAssigned) {
      const err = new Error('Not authorized to update this client');
      err.statusCode = 403;
      throw err;
    }
    delete data.is_portal_enabled;
    delete data.user_id;
  }
  if (user?.role === 'client') {
    if (existing.user_id !== user.id) {
      const err = new Error('Not authorized to update this client profile');
      err.statusCode = 403;
      throw err;
    }
    delete data.is_portal_enabled;
    delete data.user_id;
  }
  return await prisma.client.update({
    where: { id: parseInt(id) },
    data: {
      ...data,
      password: undefined,
    },
  });
};

const remove = async (id, user) => {
  if (user?.role !== 'admin') {
    const err = new Error('Only admin can delete clients');
    err.statusCode = 403;
    throw err;
  }
  return await prisma.client.delete({ where: { id: parseInt(id) } });
};


module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};