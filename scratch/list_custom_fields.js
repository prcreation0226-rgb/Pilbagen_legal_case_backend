const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const fields = await prisma.customFieldDefinition.findMany();
  console.log('All fields containing Goal, Limitation, or Jurisdiction:');
  fields.forEach(f => {
    if (/goal|limitation|jurisdiction/i.test(f.name)) {
      console.log(`ID: ${f.id}, Name: "${f.name}", Type: "${f.type}", Active: ${f.is_active}`);
    }
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
