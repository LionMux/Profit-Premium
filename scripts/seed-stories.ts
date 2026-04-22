import { prisma } from '../src/lib/prisma';

async function main() {
  await prisma.story.deleteMany({});
  await prisma.story.createMany({
    data: [
      {
        title: 'Элитные апартаменты в центре Москвы',
        imageUrl: '/stories/story1.jpg',
        link: '/materials?city=Москва',
        order: 1,
        isActive: true,
      },
      {
        title: 'Премиальные виллы у моря',
        imageUrl: '/stories/story2.jpg',
        link: '/materials',
        order: 2,
        isActive: true,
      },
      {
        title: 'Инвестиции в недвижимость 2024',
        imageUrl: '/stories/story3.jpg',
        link: '/materials',
        order: 3,
        isActive: true,
      },
      {
        title: 'Новый жилой комплекс бизнес-класса',
        imageUrl: '/stories/story4.jpg',
        link: '/materials',
        order: 4,
        isActive: true,
      },
      {
        title: 'Коттеджные поселки под ключ',
        imageUrl: '/stories/story5.jpg',
        link: '/materials',
        order: 5,
        isActive: true,
      },
      {
        title: 'Коммерческая недвижимость',
        imageUrl: '/stories/story6.jpg',
        link: '/materials',
        order: 6,
        isActive: true,
      },
    ],
  });
  const count = await prisma.story.count();
  console.log('Stories created:', count);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
