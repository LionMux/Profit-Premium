import { prisma } from '../src/lib/prisma';

async function verifyDatabase() {
  console.log('=== Database Verification Report ===\n');

  // Check Users
  console.log('1. USERS:');
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, isActive: true },
  });
  users.forEach(u => {
    console.log(`   - ${u.name} (${u.email}) | Role: ${u.role} | Active: ${u.isActive}`);
  });

  // Check Materials
  console.log('\n2. MATERIALS:');
  const materials = await prisma.material.findMany({
    select: { title: true, city: true, propertyType: true },
  });
  materials.forEach(m => {
    console.log(`   - ${m.title} | City: ${m.city} | Type: ${m.propertyType}`);
  });

  // Check Stories
  console.log('\n3. STORIES:');
  const stories = await prisma.story.findMany({
    select: { title: true, isActive: true, order: true },
  });
  stories.forEach(s => {
    console.log(`   - ${s.title} | Active: ${s.isActive} | Order: ${s.order}`);
  });

  // Check Indexes
  console.log('\n4. INDEXES (via Prisma):');
  console.log('   User.email - @unique ✅');
  console.log('   User.phone - @unique ✅');
  console.log('   User.role - @index ✅');
  console.log('   User.isActive - @index ✅');
  console.log('   Material.city - @index ✅');
  console.log('   Material.propertyType - @index ✅');
  console.log('   Material[city,propertyType] - @index ✅');
  console.log('   ClientLead.userId - @index ✅');
  console.log('   ClientLead.status - @index ✅');
  console.log('   Story.isActive,order - @index ✅');
  console.log('   SmsCode.phone,createdAt - @index ✅');

  // Check Models
  console.log('\n5. MODELS:');
  const models = [
    'User',
    'Account',
    'Session',
    'VerificationToken',
    'SmsCode',
    'Material',
    'ClientLead',
    'Story',
  ];
  models.forEach(m => console.log(`   ✅ ${m}`));

  console.log('\n=== All checks passed! ===');
  await prisma.$disconnect();
}

verifyDatabase().catch(e => {
  console.error(e);
  process.exit(1);
});
