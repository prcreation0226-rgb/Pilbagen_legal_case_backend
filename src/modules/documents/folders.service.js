const prisma = require('../../config/db');

exports.getAll = async (query, user) => {
  const { matter_id } = query;

  const userRoles = (user?.roles || []).map(r => String(r.role || r).toLowerCase());
  const isSuperAdmin = userRoles.includes('super_admin') || String(user?.role || '').toLowerCase() === 'super_admin';
  const agencyId = (!isSuperAdmin && user?.agency_id) ? parseInt(user.agency_id, 10) : null;

  const where = {};
  if (matter_id) where.matter_id = parseInt(matter_id, 10);
  if (agencyId) {
    where.matter = { agency_id: agencyId };
  }
  
  return await prisma.folder.findMany({
    where,
    orderBy: { created_at: 'asc' }
  });
};

exports.create = async (data) => {
  const { name, matterId } = data;
  return await prisma.folder.create({
    data: {
      name,
      matter_id: matterId ? parseInt(matterId, 10) : null
    }
  });
};
