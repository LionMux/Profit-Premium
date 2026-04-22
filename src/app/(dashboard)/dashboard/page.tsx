import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { StoriesCarousel } from '@/components/stories/StoriesCarousel';
import { ArrowRight, FileText } from 'lucide-react';
import { AbstractSkyline } from '@/components/illustrations/BuildingIllustrations';

const fallbackStories = [
  {
    id: 'fallback-story-1',
    imageUrl: '/stories/fallback-1.jpg',
    title: 'Премиальные резиденции у моря — готовые материалы для клиентов',
    link: '/materials',
  },
  {
    id: 'fallback-story-2',
    imageUrl: '/stories/fallback-2.jpg',
    title: 'Новая подборка интерьеров бизнес-класса для быстрой презентации',
    link: '/materials',
  },
  {
    id: 'fallback-story-3',
    imageUrl: '/stories/fallback-3.jpg',
    title: 'Объекты с высокой инвестиционной привлекательностью этой недели',
    link: '/materials',
  },
  {
    id: 'fallback-story-4',
    imageUrl: '/stories/fallback-4.jpg',
    title: 'Подборка городских проектов для партнёрских продаж и встреч',
    link: '/contacts',
  },
];

export default async function DashboardPage() {
  const session = await auth();
  const userName = session?.user?.name || 'Партнёр';
  const userId = session?.user?.id;

  const [stories, materialsCount, clientLeadsCount, recentMaterials] = await Promise.all([
    prisma.story.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    prisma.material.count(),
    userId
      ? prisma.clientLead.count({
          where: { userId },
        })
      : Promise.resolve(0),
    prisma.material.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        city: true,
        propertyType: true,
        createdAt: true,
      },
    }),
  ]);

  const featuredStories = stories.length > 0 ? stories : fallbackStories;

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col relative">
      <div className="absolute bottom-0 left-0 right-0 opacity-[0.04] pointer-events-none overflow-hidden">
        <AbstractSkyline className="w-full h-80 text-cream" />
      </div>

      <section className="mb-10 lg:mb-12 relative z-10">
        <div className="mb-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <p className="text-cream/55 text-[10px] tracking-[0.3em] uppercase mb-3">
              Кабинет партнёра
            </p>
            <h1 className="font-serif text-cream text-4xl lg:text-6xl font-semibold leading-[1.02] mb-3">
              Добро пожаловать,
              <br />
              {userName}
            </h1>
            <p className="text-cream/60 max-w-2xl text-base lg:text-lg leading-relaxed">
              Актуальные предложения, материалы для клиентов и передача лидов — всё в одном рабочем
              пространстве для партнёрской продажи недвижимости.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-6">
          <div className="border border-white/10 bg-white/5 p-5 lg:p-6 backdrop-blur-sm">
            <div className="mb-5">
              <p className="text-cream/50 text-[10px] tracking-[0.28em] uppercase mb-2">
                Актуальные предложения
              </p>
            </div>

            <StoriesCarousel
              stories={featuredStories}
              autoPlay={true}
              autoPlayInterval={4500}
              showDots={true}
              showArrows={true}
            />
          </div>

          <div className="border border-white/10 bg-gradient-to-b from-white/5 to-burgundy/60 p-6 backdrop-blur-sm">
            <p className="text-cream/45 text-[10px] tracking-[0.28em] uppercase mb-3">
              Рабочий статус
            </p>
            <h3 className="font-serif text-2xl text-cream font-semibold mb-4">Личный кабинет</h3>

            <div className="space-y-4 mb-6">
              <div className="border border-white/10 bg-black/10 p-4">
                <p className="text-cream/45 text-[10px] tracking-[0.24em] uppercase mb-2">
                  Материалов доступно
                </p>
                <p className="font-serif text-4xl text-cream">{materialsCount}</p>
              </div>
              <div className="border border-white/10 bg-black/10 p-4">
                <p className="text-cream/45 text-[10px] tracking-[0.24em] uppercase mb-2">
                  Передано клиентов
                </p>
                <p className="font-serif text-4xl text-cream">{clientLeadsCount}</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="text-sm text-cream/60 leading-relaxed mb-5">
                Рабочая зона собрана без лишних блоков: сначала предложения, затем материалы и
                основные бизнес-сценарии.
              </p>
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 text-sm text-cream hover:text-white transition-colors"
              >
                Открыть профиль
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 lg:mb-14 relative z-10">
        <div className="border border-white/10 bg-white/5 p-6 lg:p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-cream/50 text-[10px] tracking-[0.28em] uppercase mb-3">
                Новые материалы
              </p>
              <h3 className="font-serif text-2xl lg:text-3xl text-cream font-semibold">
                Свежие презентации для работы
              </h3>
            </div>
            <div className="h-12 w-12 border border-white/10 bg-black/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-cream" />
            </div>
          </div>

          <div className="space-y-3">
            {recentMaterials.length > 0 ? (
              recentMaterials.map(material => (
                <div
                  key={material.id}
                  className="border border-white/10 bg-black/10 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div>
                    <p className="text-cream font-medium">{material.title}</p>
                    <p className="text-sm text-cream/50">
                      {material.city} • {material.propertyType}
                    </p>
                  </div>
                  <div className="text-sm text-cream/60">
                    {new Date(material.createdAt).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                    })}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-cream/50">Свежие материалы скоро появятся.</p>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <Link
              href="/materials"
              className="inline-flex items-center gap-2 text-sm text-cream hover:text-white transition-colors"
            >
              Перейти ко всем материалам
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
