const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating database branding and emails...');

  // 1. Update users
  const users = await prisma.user.findMany();
  for (const u of users) {
    let updatedEmail = u.email;
    let updatedName = u.full_name;

    if (u.email.endsWith('@vktori.com') || u.email.endsWith('@vktori.se')) {
      updatedEmail = u.email.replace(/@vktori\.(com|se)$/, '@pilbagen.se');
    } else if (u.email === 'admin@pilbagan.com') {
      updatedEmail = 'admin@pilbagen.se';
    }

    if (u.full_name && u.full_name.includes('Victoria')) {
      updatedName = u.full_name.replace('Victoria', 'Pilbågen');
    } else if (u.full_name === 'pilbagen Admin') {
      updatedName = 'Pilbågen Admin';
    }

    if (updatedEmail !== u.email || updatedName !== u.full_name) {
      await prisma.user.update({
        where: { id: u.id },
        data: {
          email: updatedEmail,
          full_name: updatedName
        }
      });
      console.log(`Updated User ID ${u.id}: ${u.email} -> ${updatedEmail}, ${u.full_name} -> ${updatedName}`);
    }
  }

  // 2. Update agencies
  const agencies = await prisma.agency.findMany();
  for (const a of agencies) {
    let updatedEmail = a.email;
    let updatedOwner = a.owner;

    if (a.email.endsWith('@vktori.com') || a.email.endsWith('@vktori.se') || a.email === 'default@vktori.com') {
      updatedEmail = a.email.replace(/@vktori\.(com|se)$/, '@pilbagen.se');
    }

    if (a.owner && a.owner.includes('Victoria')) {
      updatedOwner = a.owner.replace('Victoria', 'Pilbågen');
    }

    if (updatedEmail !== a.email || updatedOwner !== a.owner) {
      await prisma.agency.update({
        where: { id: a.id },
        data: {
          email: updatedEmail,
          owner: updatedOwner
        }
      });
      console.log(`Updated Agency ID ${a.id}: ${a.email} -> ${updatedEmail}, ${a.owner} -> ${updatedOwner}`);
    }
  }

  // 3. Update clients
  const clients = await prisma.client.findMany();
  for (const c of clients) {
    let updatedEmail = c.email;
    let updatedName = c.full_name;

    if (c.email && (c.email.endsWith('@vktori.com') || c.email.endsWith('@vktori.se'))) {
      updatedEmail = c.email.replace(/@vktori\.(com|se)$/, '@pilbagen.se');
    }

    if (c.full_name && c.full_name.includes('Victoria')) {
      updatedName = c.full_name.replace('Victoria', 'Pilbågen');
    }

    if (updatedEmail !== c.email || updatedName !== c.full_name) {
      await prisma.client.update({
        where: { id: c.id },
        data: {
          email: updatedEmail,
          full_name: updatedName
        }
      });
      console.log(`Updated Client ID ${c.id}: ${c.email} -> ${updatedEmail}, ${c.full_name} -> ${updatedName}`);
    }
  }

  console.log('Database branding update completed successfully.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
