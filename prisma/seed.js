const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Default Agency and Office if not exist
  const defaultAgency = await prisma.agency.upsert({
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

  const defaultOffice = await prisma.office.upsert({
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

  // Create Super Admin User
  const superAdminPassword = await bcrypt.hash('1234', 10);
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@vktori.com' },
    update: { password_hash: superAdminPassword, role: 'admin' },
    create: {
      email: 'superadmin@vktori.com',
      full_name: 'Pilbågen Super Admin',
      password_hash: superAdminPassword,
      role: 'admin',
      agency_id: 1,
      office_id: 1
    },
  });

  await prisma.userRole.upsert({
    where: { user_id_role: { user_id: superAdmin.id, role: 'super_admin' } },
    update: {},
    create: {
      user_id: superAdmin.id,
      role: 'super_admin',
    },
  });

  // Seed sample agencies and offices for Super Admin
  const sampleAgencies = [
    { id: 101, name: 'Apex Legal Group', owner: 'Alexander Mercer', email: 'alex@apexlegal.se', plan: 'Professional', status: 'active', subscription_amount: 850.00 },
    { id: 102, name: 'Vanguard Law Partners', owner: 'Sophia Lin', email: 'sophia@vanguardlaw.se', plan: 'Enterprise', status: 'active', subscription_amount: 1500.00 },
    { id: 103, name: 'Beacon Civil Rights', owner: 'Marcus Vance', email: 'marcus@beaconcivil.se', plan: 'Basic', status: 'inactive', subscription_amount: 450.00 },
  ];

  for (const sa of sampleAgencies) {
    await prisma.agency.upsert({
      where: { email: sa.email },
      update: {},
      create: sa
    });
  }

  const sampleOffices = [
    { id: 101, name: 'Gothenburg Branch', agency_id: 101, city: 'Gothenburg', status: 'active' },
    { id: 102, name: 'Malmö Office', agency_id: 102, city: 'Malmö', status: 'active' },
    { id: 103, name: 'Uppsala Branch', agency_id: 103, city: 'Uppsala', status: 'inactive' },
  ];

  for (const so of sampleOffices) {
    await prisma.office.upsert({
      where: { id: so.id },
      update: {},
      create: so
    });
  }

  // Seed sample platform activity logs
  const logsCount = await prisma.activity.count({ where: { matter_id: null } });
  if (logsCount === 0) {
    await prisma.activity.createMany({
      data: [
        { actor_user_id: superAdmin.id, entity_type: 'Agency', entity_id: 101, action: 'CREATE', description: JSON.stringify({ message: 'Created Apex Legal Group agency', ip_address: '127.0.0.1', user_agent: 'Mozilla/5.0' }) },
        { actor_user_id: superAdmin.id, entity_type: 'Office', entity_id: 101, action: 'CREATE', description: JSON.stringify({ message: 'Added Gothenburg Branch office', ip_address: '127.0.0.1', user_agent: 'Mozilla/5.0' }) },
        { actor_user_id: superAdmin.id, entity_type: 'Settings', entity_id: 0, action: 'UPDATE', description: JSON.stringify({ message: 'Updated default system language to English', ip_address: '127.0.0.1', user_agent: 'Mozilla/5.0' }) },
      ]
    });
  }

  // Create Admin User
  const adminPassword = await bcrypt.hash('1234', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@vktori.com' },
    update: { password_hash: adminPassword, role: 'admin' },
    create: {
      email: 'admin@vktori.com',
      full_name: 'Victoria Admin',
      password_hash: adminPassword,
      role: 'admin',
    },
  });

  console.log({ admin });

  // Create a Lawyer
  const lawyerPassword = await bcrypt.hash('1234', 10);
  const lawyerUser = await prisma.user.upsert({
    where: { email: 'lawyer@vktori.com' },
    update: { password_hash: lawyerPassword, role: 'lawyer' },
    create: {
      email: 'lawyer@vktori.com',
      full_name: 'Lawyer John',
      password_hash: lawyerPassword,
      role: 'lawyer',
    },
  });

  await prisma.lawyer.upsert({
    where: { user_id: lawyerUser.id },
    update: {},
    create: {
      user_id: lawyerUser.id,
      display_name: 'John Doe, Esq.',
      practice_focus: 'Civil Litigation',
    },
  });

  console.log({ lawyerUser });

  // Create a Client User
  const clientPassword = await bcrypt.hash('1234', 10);
  const clientUser = await prisma.user.upsert({
    where: { email: 'client@vktori.com' },
    update: { password_hash: clientPassword, role: 'client' },
    create: {
      email: 'client@vktori.com',
      full_name: 'Sarah Client',
      password_hash: clientPassword,
      role: 'client',
    },
  });

  await prisma.client.upsert({
    where: { user_id: clientUser.id },
    update: {},
    create: {
      user_id: clientUser.id,
      full_name: 'Sarah Client',
      email: 'client@vktori.com',
      is_portal_enabled: true
    },
  });

  console.log({ clientUser });

  // Create a Lead
  await prisma.lead.create({
    data: {
      full_name: 'Sample Lead',
      email: 'lead@example.com',
      phone: '123-456-7890',
      matter_type: 'Divorce',
      practice_area: 'Family Law',
      source: 'Google',
      message: 'I need legal advice regarding my divorce.',
      status: 'new',
    },
  });


  // Create a Matter
  const matter = await prisma.matter.upsert({
    where: { matter_number: 'MAT-2026-001' },
    update: {},
    create: {
      matter_number: 'MAT-2026-001',
      title: 'The People vs. Sample Case',
      client_id: 1, // First client created (Sarah)
      assigned_lawyer_id: lawyerUser.id,
      practice_area: 'Civil Litigation',
      matter_type: 'Litigation',
      description: 'Initial sample matter for testing the timer system.',
      created_by_user_id: admin.id,
      status: 'active'
    }
  });

  console.log({ matter });
  
  // Create Social Links
  const platforms = ['LinkedIn', 'Instagram', 'Facebook', 'YouTube'];
  for (const platform of platforms) {
    await prisma.socialLink.upsert({
      where: { platform },
      update: {},
      create: { platform, url: '' },
    });
  }

  // Seed Practice Areas
  const defaultPracticeAreas = [
    'Civil Litigation',
    'Family Law',
    'Criminal Defense',
    'Corporate Law',
    'Real Estate',
    'Employment Law',
    'Intellectual Property',
  ];

  for (const name of defaultPracticeAreas) {
    const existing = await prisma.practiceArea.findFirst({ where: { name } });
    if (!existing) {
      await prisma.practiceArea.create({ data: { name } });
    }
  }

  // Seed Default Custom Fields
  const defaultCustomFields = [
    { name: 'Settlement Goal', type: 'currency' },
    { name: 'Statute of Limitations', type: 'date' },
    { name: 'Court Jurisdiction', type: 'text' },
  ];

  for (const field of defaultCustomFields) {
    const existing = await prisma.customFieldDefinition.findFirst({ where: { name: field.name } });
    if (!existing) {
      await prisma.customFieldDefinition.create({
        data: field
      });
    }
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
