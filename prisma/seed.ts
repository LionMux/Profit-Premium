import { prisma } from '../src/lib/prisma';
import { hash } from 'bcryptjs';

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@profit-premium.ru' },
    update: {},
    create: {
      email: 'admin@profit-premium.ru',
      name: 'Администратор',
      passwordHash: adminPassword,
      role: 'ADMIN',
      isActive: true,
    },
  });

  // Create test partner
  const partnerPassword = await hash('partner123', 10);
  const partner = await prisma.user.upsert({
    where: { email: 'partner@example.com' },
    update: {},
    create: {
      email: 'partner@example.com',
      name: 'Тестовый Партнер',
      passwordHash: partnerPassword,
      role: 'PARTNER',
      isActive: true,
    },
  });

  // Create sample materials
  await prisma.material.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'ЖК Солнечный - Презентация',
        description: 'Полная презентация жилого комплекса',
        fileUrl: '/uploads/sample1.pdf',
        thumbnailUrl: '/uploads/thumb1.jpg',
        city: 'Москва',
        propertyType: 'Квартира',
      },
      {
        title: 'Коттеджный поселок Ромашки',
        description: 'Презентация коттеджного поселка',
        fileUrl: '/uploads/sample2.pdf',
        thumbnailUrl: '/uploads/thumb2.jpg',
        city: 'Санкт-Петербург',
        propertyType: 'Дом',
      },
    ],
  });

  // Create sample story
  await prisma.story.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Новое предложение!',
        imageUrl: '/uploads/story1.jpg',
        link: '/materials',
        order: 1,
        isActive: true,
      },
    ],
  });

  console.log('Seed data created:');
  console.log({ admin, partner });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
