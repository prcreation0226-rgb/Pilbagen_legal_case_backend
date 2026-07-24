const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log('Users:');
  users.forEach(u => console.log(`ID: ${u.id}, Email: ${u.email}, Name: ${u.full_name}, Role: ${u.role}`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
