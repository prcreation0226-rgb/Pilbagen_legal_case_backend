const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAll = async (user) => {
  const userRoles = (user?.roles || []).map(r => String(r.role || r).toLowerCase());
  const isSuperAdmin = userRoles.includes('super_admin') || String(user?.role || '').toLowerCase() === 'super_admin';
  const agencyId = (!isSuperAdmin && user?.agency_id) ? parseInt(user.agency_id, 10) : null;

  const where = {};
  if (agencyId) {
    const agencyUserIds = (await prisma.user.findMany({ where: { agency_id: agencyId }, select: { id: true } })).map(u => u.id);
    where.created_by = { in: agencyUserIds };
  }

  return await prisma.genericActivity.findMany({
    where,
    orderBy: { updated_at: 'desc' }
  });
};

const getById = async (id, user) => {
  return await prisma.genericActivity.findUnique({
    where: { id: parseInt(id) }
  });
};

const create = async (data, user) => {
  const { title, type, description, status } = data;
  return await prisma.genericActivity.create({
    data: {
      title,
      type,
      description,
      status: status || 'Open',
      created_by: user.id
    }
  });
};

const update = async (id, data, user) => {
  const { title, type, description, status } = data;
  return await prisma.genericActivity.update({
    where: { id: parseInt(id) },
    data: {
      title,
      type,
      description,
      status
    }
  });
};

const remove = async (id, user) => {
  return await prisma.genericActivity.delete({
    where: { id: parseInt(id) }
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
