const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    orderBy: { id: 'asc' }
  });
  console.log(`Total users in DB: ${users.length}`);
  for (const u of users) {
    console.log(`ID: ${u.id}, Email: ${u.email}, Name: ${u.full_name}, Role: ${u.role}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
