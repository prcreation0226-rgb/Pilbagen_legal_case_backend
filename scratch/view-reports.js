const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const reports = await prisma.report.findMany();
  console.log('Reports:');
  console.log(JSON.stringify(reports, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
