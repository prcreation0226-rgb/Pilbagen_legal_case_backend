const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const agency = await prisma.agency.upsert({
    where: { email: 'default@vktori.com' },
    update: {},
    create: {
      id: 1,
      name: 'Default Agency',
      owner: 'Victoria Admin',
      email: 'default@vktori.com',
      plan: 'Enterprise',
      status: 'active',
      subscription_amount: 1200.00
    }
  });
  console.log('Seeded Agency:', agency);

  const office = await prisma.office.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Stockholm HQ',
      agency_id: 1,
      city: 'Stockholm',
      status: 'active'
    }
  });
  console.log('Seeded Office:', office);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
