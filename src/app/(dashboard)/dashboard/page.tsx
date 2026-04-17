import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { StoriesCarousel } from '@/components/stories/StoriesCarousel';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { Send, ExternalLink } from 'lucide-react';
import { AbstractSkyline } from '@/components/illustrations/BuildingIllustrations';

export default async function DashboardPage() {
  const session = await auth();
  const userName = session?.user?.name || 'Партнёр';

  const stories = await prisma.story.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  const quickActions = [
    {
      icon: 'fileText',
      title: 'МАТЕРИАЛЫ',
      description: 'Презентации и документы по объектам недвижимости',
      href: '/materials',
      variant: 'primary' as const,
    },
    {
      icon: 'user',
      title: 'ЛИЧНЫЙ КАБИНЕТ',
      description: 'Управление профилем и передача клиентов',
      href: '/profile',
      variant: 'secondary' as const,
    },
    {
      icon: 'phone',
      title: 'КОНТАКТЫ',
      description: 'Юридическая информация и реквизиты компании',
      href: '/contacts',
      variant: 'secondary' as const,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col relative">
      {/* Decorative Background */}
      <div className="absolute bottom-0 left-0 right-0 opacity-[0.06] pointer-events-none overflow-hidden">
        <AbstractSkyline className="w-full h-96 text-cream" />
      </div>

      {/* Welcome Section */}
      <WelcomeSection userName={userName} />

      {/* Stories Section */}
      <section className="mb-16 relative">
        <div className="mb-8">
          <p className="text-cream/60 text-[10px] tracking-[0.3em] mb-3 uppercase">
            Новости и акции
          </p>
          <h2 className="font-serif text-cream text-3xl lg:text-4xl font-semibold uppercase tracking-wide leading-tight">
            Актуальные предложения
          </h2>
        </div>

        <StoriesCarousel
          stories={stories}
          autoPlay={true}
          autoPlayInterval={5000}
          showDots={true}
          showArrows={true}
        />

        {/* Empty State */}
        {stories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-cream/20  bg-cream/5">
            <p className="text-cream/60 text-lg text-center">
              Новости и акции появятся здесь позже
            </p>
          </div>
        )}
      </section>

      {/* Quick Actions Section */}
      <section className="mb-12">
        <div className="mb-8">
          <p className="text-cream/60 text-[10px] tracking-[0.3em] mb-3 uppercase">
            Быстрый доступ
          </p>
          <h2 className="font-serif text-cream text-3xl lg:text-4xl font-semibold uppercase tracking-wide leading-tight">
            Разделы кабинета
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={action.title}
              {...action}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>

      {/* Transfer Client CTA */}
      <section className="mt-auto">
        <div className="bg-burgundy border border-white/10  p-8 lg:p-10 relative overflow-hidden group transition-all duration-500">
          {/* Decorative Element */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.06] pointer-events-none">
            <AbstractSkyline className="w-full h-full text-cream" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl lg:text-3xl text-cream font-semibold mb-2">
                Передать клиента
              </h3>
              <p className="text-cream/60 max-w-lg">
                Заполните форму, чтобы передать клиента в CRM систему.
                Мы свяжемся с ним в течение 24 часов.
              </p>
            </div>

            <a
              href="/profile"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-cream text-burgundy-dark text-sm font-bold tracking-[0.2em] hover:bg-cream/90 transition-all duration-300  group/btn"
            >
              <Send className="h-5 w-5" />
              ПЕРЕДАТЬ КЛИЕНТА
              <ExternalLink className="h-4 w-4 opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all duration-300" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
