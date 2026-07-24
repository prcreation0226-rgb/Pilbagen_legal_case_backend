const prisma = require('../../config/db');

const getAgencyScope = (user) => {
  const userRoles = (user?.roles || []).map(r => String(r.role || r).toLowerCase());
  const isSuperAdmin = userRoles.includes('super_admin') || String(user?.role || '').toLowerCase() === 'super_admin';
  if (isSuperAdmin || !user?.agency_id) return null;
  return parseInt(user.agency_id, 10);
};

exports.generate = async (userId, body, user) => {
  const { title, category, start_date, end_date } = body;
  const cat = String(category || '').toLowerCase();
  const agencyId = getAgencyScope(user);

  const whereDate = {
    gte: new Date(start_date),
    lte: new Date(end_date)
  };

  const invoiceAgency = agencyId ? { agency_id: agencyId } : {};
  const matterAgency = agencyId ? { agency_id: agencyId } : {};
  const leadAgency = agencyId ? { agency_id: agencyId } : {};
  const timeEntryAgency = agencyId ? { matter: { agency_id: agencyId } } : {};

  const reportData = {
    leads: 0,
    matters: 0,
    revenue: 0,
    hours: 0
  };

  if (cat === 'financial') {
    // Revenue only
    const paidInvoices = await prisma.invoice.findMany({
      where: {
        status: 'paid',
        updated_at: whereDate,
        ...invoiceAgency
      },
      select: { amount: true }
    });
    reportData.revenue = paidInvoices.reduce((sum, inv) => sum + Number(inv.amount || 0), 0);
  } 
  else if (cat === 'operational') {
    // Matters + Hours
    const mattersCount = await prisma.matter.count({
      where: { created_at: whereDate, ...matterAgency }
    });

    const timers = await prisma.timeEntry.findMany({
      where: {
        start_time: whereDate,
        is_running: false,
        ...timeEntryAgency
      },
      select: { duration_minutes: true }
    });

    const totalMinutes = timers.reduce((sum, t) => sum + (t.duration_minutes || 0), 0);
    
    reportData.matters = mattersCount;
    reportData.hours = Number((totalMinutes / 60).toFixed(2));
  } 
  else if (cat === 'marketing') {
    // Leads only
    const leadsCount = await prisma.lead.count({
      where: { created_at: whereDate, ...leadAgency }
    });
    reportData.leads = leadsCount;
  } 
  else {
    // Fallback: All data
    const leadsCount = await prisma.lead.count({ where: { created_at: whereDate, ...leadAgency } });
    const mattersCount = await prisma.matter.count({ where: { created_at: whereDate, ...matterAgency } });
    const paidInvoices = await prisma.invoice.findMany({
      where: { status: 'paid', updated_at: whereDate, ...invoiceAgency },
      select: { amount: true }
    });
    const timers = await prisma.timeEntry.findMany({
      where: { start_time: whereDate, is_running: false, ...timeEntryAgency },
      select: { duration_minutes: true }
    });

    const totalMinutes = timers.reduce((sum, t) => sum + (t.duration_minutes || 0), 0);

    reportData.leads = leadsCount;
    reportData.matters = mattersCount;
    reportData.revenue = paidInvoices.reduce((sum, inv) => sum + Number(inv.amount || 0), 0);
    reportData.hours = Number((totalMinutes / 60).toFixed(2));
  }

  const report = await prisma.report.create({
    data: {
      title,
      category,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      data: reportData,
      created_by: userId
    }
  });

  return report;
};

exports.list = async (user) => {
  const agencyId = getAgencyScope(user);
  let where = {};
  if (agencyId) {
    const agencyUsers = await prisma.user.findMany({
      where: { agency_id: agencyId },
      select: { id: true }
    });
    const userIds = agencyUsers.map(u => u.id);
    where = { created_by: { in: userIds } };
  }
  return await prisma.report.findMany({
    where,
    orderBy: { created_at: 'desc' }
  });
};

exports.getById = async (id) => {
  return await prisma.report.findUnique({
    where: { id }
  });
};

exports.getMarketingStats = async (user) => {
  const agencyId = getAgencyScope(user);
  const leadFilter = agencyId ? { agency_id: agencyId } : {};
  const clientFilter = agencyId ? { agency_id: agencyId } : {};
  const invoiceFilter = agencyId ? { agency_id: agencyId } : {};

  // Leads
  const totalLeads = await prisma.lead.count({ where: leadFilter });

  // Clients
  const totalClients = await prisma.client.count({ where: clientFilter });

  // Conversion Rate
  const conversionRate = totalLeads === 0
    ? 0
    : ((totalClients / totalLeads) * 100).toFixed(1);

  // Revenue (Paid Invoices Total)
  const payments = await prisma.invoice.findMany({
    where: { status: 'paid', ...invoiceFilter },
    select: { amount: true }
  });

  const revenue = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  // Leads by source
  const leadsBySource = await prisma.lead.groupBy({
    by: ['source'],
    where: leadFilter,
    _count: { id: true }
  });

  // Map to UI friendly sources with percentages
  const totalBySources = leadsBySource.reduce((sum, item) => sum + item._count.id, 0);
  const formattedSources = leadsBySource.map(item => ({
    name: item.source || 'Other',
    value: totalBySources === 0 ? 0 : Math.round((item._count.id / totalBySources) * 100),
    count: item._count.id,
    color: item.source === 'Google' ? 'bg-blue-500' :
           item.source === 'Referral' ? 'bg-amber-500' :
           item.source === 'Social' ? 'bg-emerald-500' : 'bg-slate-400'
  }));

  return {
    visitors: totalLeads, // using leads as proxy for visitors in this simplified model
    leads: totalLeads,
    clients: totalClients,
    conversionRate,
    revenue,
    leadsBySource: formattedSources
  };
};
