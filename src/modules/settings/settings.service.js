const prisma = require('../../config/db');

/**
 * Fetches all settings and converts them into a key-value object.
 */
exports.getAll = async () => {
  const settings = await prisma.setting.findMany();
  const result = {};
  settings.forEach(s => {
    result[s.key] = s.value;
  });
  return result;
};

/**
 * Bulk updates or creates settings from an object.
 */
exports.update = async (data) => {
  const entries = Object.entries(data);
  for (const [key, value] of entries) {
    if (value === undefined || value === null) continue;
    await prisma.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) }
    });
  }
  return true;
};

/**
 * Fetches the Agency Company Profile.
 */
exports.getCompanyProfile = async (user) => {
  const targetId = user?.agency_id ? parseInt(user.agency_id, 10) : 1;
  const profile = await prisma.companyProfile.findUnique({
    where: { id: targetId }
  });
  return profile || {};
};

/**
 * Updates the Agency Company Profile.
 */
exports.updateCompanyProfile = async (data, user) => {
  const targetId = user?.agency_id ? parseInt(user.agency_id, 10) : 1;
  const { id, created_at, updated_at, ...updateData } = data;
  return await prisma.companyProfile.upsert({
    where: { id: targetId },
    update: updateData,
    create: { id: targetId, ...updateData }
  });
};
