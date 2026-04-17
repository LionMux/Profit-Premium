import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { StoriesManager } from '@/components/admin/StoriesManager';
import { UploadMaterialCard } from '@/components/admin/UploadMaterialCard';
import { StatCard } from '@/components/admin/StatCard';
import { Clock } from 'lucide-react';
import { AbstractSkyline, GeometricCity } from '@/components/illustrations/BuildingIllustrations';

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  // Check if user is admin or manager
  const userRole = session.user?.role;
  if (userRole !== 'ADMIN' && userRole !== 'MANAGER') {
    redirect('/dashboard');
  }

  // Fetch stories for the manager
  const stories = await prisma.story.findMany({
    orderBy: { order: 'asc' },
  });

  // Fetch stats
  const [
    materialsCount,
    usersCount,
    storiesCount,
    recentMaterials,
  ] = await Promise.all([
    prisma.material.count(),
    prisma.user.count(),
    prisma.story.count({ where: { isActive: true } }),
    prisma.material.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        city: true,
        createdAt: true,
      },
    }),
  ]);

  // Get unique cities count
  const citiesData = await prisma.material.findMany({
    select: { city: true },
    distinct: ['city'],
  });
  const citiesCount = citiesData.length;

  const stats = [
    {
      icon: 'fileText',
      label: 'Материалы',
      value: materialsCount,
      trend: '+12%',
      color: 'bg-cream/10',
    },
    {
      icon: 'users',
      label: 'Пользователи',
      value: usersCount,
      trend: '+5%',
      color: 'bg-burgundy-light/30',
    },
    {
      icon: 'building2',
      label: 'Города',
      value: citiesCount,
      trend: null,
      color: 'bg-cream/10',
    },
    {
      icon: 'layoutGrid',
      label: 'Активные сторис',
      value: storiesCount,
      trend: null,
      color: 'bg-burgundy-light/30',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.02] pointer-events-none overflow-hidden">
        <GeometricCity className="w-full h-full text-cream" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen bg-burgundy-dark relative z-10">
        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          {/* Logo */}
          <div className="mb-10">
            <div className="text-cream font-serif">
              <div className="text-xl tracking-[0.3em] font-light">PROFIT</div>
              <div className="text-xl tracking-[0.4em] font-semibold">PREMIUM</div>
            </div>
          </div>

          {/* Header */}
          <section className="mb-12">
            <p className="text-cream/60 text-xs tracking-[0.3em] mb-3 uppercase">
              Управление контентом
            </p>
            <h1 className="font-serif text-cream text-4xl lg:text-5xl font-semibold mb-3">
              Админ-панель
            </h1>
            <p className="text-cream/60 max-w-lg leading-relaxed">
              Управление материалами, сторис и пользователями. Загрузка новых презентаций.
            </p>
          </section>

          {/* Stats Grid */}
          <section className="mb-12">
            <p className="text-cream/60 text-xs tracking-[0.3em] mb-6 uppercase">
              Статистика
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  {...stat}
                  delay={index * 0.05}
                />
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="mb-12">
            <p className="text-cream/60 text-xs tracking-[0.3em] mb-6 uppercase">
              Быстрые действия
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UploadMaterialCard />

              {/* Recent Activity Card */}
              <div className="bg-cream/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:bg-cream/10 transition-all duration-500">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-lg bg-burgundy-light/50 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-[0.15em] text-cream">
                      НЕДАВНИЕ МАТЕРИАЛЫ
                    </h3>
                  </div>
                </div>

                {recentMaterials.length > 0 ? (
                  <div className="space-y-3">
                    {recentMaterials.map((material) => (
                      <div
                        key={material.id}
                        className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                      >
                        <div>
                          <p className="text-sm text-cream line-clamp-1">{material.title}</p>
                          <p className="text-xs text-cream/50">{material.city}</p>
                        </div>
                        <span className="text-xs text-cream/40">
                          {new Date(material.createdAt).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-cream/50 text-center py-4">
                    Нет недавних материалов
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Stories Management */}
          <section className="mb-12">
            <div className="bg-cream/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
              <StoriesManager stories={stories} />
            </div>
          </section>

          {/* Instructions */}
          <section className="mb-12">
            <p className="text-cream/60 text-xs tracking-[0.3em] mb-6 uppercase">
              Инструкции
            </p>
            <div className="bg-cream/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
              <h3 className="font-serif text-xl text-cream font-semibold mb-6">
                Как загрузить материал
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    step: '1',
                    title: 'Заполните информацию',
                    description: 'Укажите название и описание объекта недвижимости',
                  },
                  {
                    step: '2',
                    title: 'Выберите категорию',
                    description: 'Укажите город и тип недвижимости для фильтрации',
                  },
                  {
                    step: '3',
                    title: 'Загрузите файл',
                    description: 'Загрузите PDF-презентацию (до 50 МБ)',
                  },
                  {
                    step: '4',
                    title: 'Добавьте обложку',
                    description: 'Загрузите изображение для карточки (опционально)',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-cream/20 flex items-center justify-center flex-shrink-0 text-sm font-medium text-cream">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-cream mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-cream/60 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="p-6 lg:p-10 border-t border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="text-cream font-serif">
              <div className="text-lg tracking-[0.3em] font-light">PROFIT</div>
              <div className="text-lg tracking-[0.4em] font-semibold">PREMIUM</div>
            </div>
            <p className="text-xs text-cream/40">
              Административная панель • {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>

      {/* Right Sidebar */}
      <aside className="w-full lg:w-72 bg-cream flex flex-col lg:h-screen lg:sticky lg:top-0 order-first lg:order-last">
        {/* Logo Area */}
        <div className="p-6 lg:p-8 border-b border-cream-dark/20">
          <div className="text-burgundy-dark font-serif">
            <div className="text-xl lg:text-2xl tracking-wide leading-tight">
              <span className="font-light">PROFIT</span>
            </div>
            <div className="text-xl lg:text-2xl tracking-widest font-semibold leading-tight">
              PREMIUM
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 lg:p-6 space-y-1 overflow-y-auto">
          {[
            { href: '/dashboard', label: 'ГЛАВНАЯ', active: false },
            { href: '/materials', label: 'МАТЕРИАЛЫ', active: false },
            { href: '/profile', label: 'ЛИЧНЫЙ КАБИНЕТ', active: false },
            { href: '/contacts', label: 'КОНТАКТЫ', active: false },
            { href: '/admin', label: 'АДМИНКА', active: true },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 lg:py-4 rounded-lg transition-all duration-200
                ${item.active
                  ? 'bg-burgundy text-white shadow-md'
                  : 'text-burgundy-dark hover:bg-cream-dark/30'
                }
              `}
            >
              <span className="font-medium text-sm tracking-wide">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 lg:p-6 border-t border-cream-dark/20 bg-cream-dark/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-burgundy flex items-center justify-center text-white font-medium">
              {session.user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-burgundy-dark truncate">
                {session.user?.name || 'Администратор'}
              </p>
              <p className="text-xs text-burgundy/60 truncate">
                {session.user?.email || ''}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
