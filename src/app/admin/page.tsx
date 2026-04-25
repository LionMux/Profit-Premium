import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users2,
} from 'lucide-react';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { StoriesManager } from '@/components/admin/StoriesManager';
import { UploadMaterialCard } from '@/components/admin/UploadMaterialCard';
import { StatCard } from '@/components/admin/StatCard';
import { AbstractSkyline } from '@/components/illustrations/BuildingIllustrations';

const roleLabels: Record<string, string> = {
  ADMIN: 'Администратор',
  MANAGER: 'Менеджер',
  PARTNER: 'Партнёр',
};

const leadStatusLabels: Record<string, string> = {
  NEW: 'Новый',
  SENT_TO_BITRIX: 'Отправлен в Bitrix',
  PROCESSED: 'Обработан',
  ERROR: 'Ошибка',
};

const leadStatusClasses: Record<string, string> = {
  NEW: 'bg-cream/10 text-cream/80 border border-white/10',
  SENT_TO_BITRIX: 'bg-emerald-500/10 text-emerald-300 border border-emerald-400/20',
  PROCESSED: 'bg-sky-500/10 text-sky-300 border border-sky-400/20',
  ERROR: 'bg-red-500/10 text-red-300 border border-red-400/20',
};

const adminGallery = [
  {
    title: 'Контроль материалов',
    description:
      'Следите за качеством каталога, обновляйте презентации и держите витрину объектов актуальной.',
    href: '/materials',
    imageUrl: '/stories/admin-gallery-1.jpg',
  },
  {
    title: 'Управление CRM-потоком',
    description:
      'Контролируйте статусы лидов, скорость обработки и корректность передачи в Bitrix.',
    href: '/profile',
    imageUrl: '/stories/admin-gallery-2.jpg',
  },
  {
    title: 'Команда и доступы',
    description:
      'Администраторский взгляд на роли, новых пользователей и структуру работы кабинета.',
    href: '/dashboard',
    imageUrl: '/stories/admin-gallery-3.jpg',
  },
];

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const userRole = session.user?.role;
  if (userRole !== 'ADMIN' && userRole !== 'MANAGER') {
    redirect('/dashboard');
  }

  const [
    stories,
    materialsCount,
    usersCount,
    totalLeadsCount,
    activeStoriesCount,
    newLeadsCount,
    sentLeadsCount,
    processedLeadsCount,
    adminCount,
    managerCount,
    partnerCount,
    citiesData,
    propertyTypesData,
    recentMaterials,
    recentLeads,
    recentUsers,
  ] = await Promise.all([
    prisma.story.findMany({
      orderBy: { order: 'asc' },
    }),
    prisma.material.count(),
    prisma.user.count(),
    prisma.clientLead.count(),
    prisma.story.count({ where: { isActive: true } }),
    prisma.clientLead.count({ where: { status: 'NEW' } }),
    prisma.clientLead.count({ where: { status: 'SENT_TO_BITRIX' } }),
    prisma.clientLead.count({ where: { status: 'PROCESSED' } }),
    prisma.user.count({ where: { role: 'ADMIN' } }),
    prisma.user.count({ where: { role: 'MANAGER' } }),
    prisma.user.count({ where: { role: 'PARTNER' } }),
    prisma.material.findMany({
      select: { city: true },
      distinct: ['city'],
    }),
    prisma.material.findMany({
      select: { propertyType: true },
      distinct: ['propertyType'],
    }),
    prisma.material.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        city: true,
        propertyType: true,
        createdAt: true,
      },
    }),
    prisma.clientLead.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        city: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    }),
    prisma.user.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),
  ]);

  const citiesCount = citiesData.length;
  const propertyTypesCount = propertyTypesData.length;
  const handledLeadsCount = sentLeadsCount + processedLeadsCount;
  const conversionRate =
    totalLeadsCount > 0 ? Math.round((handledLeadsCount / totalLeadsCount) * 100) : 0;

  const stats = [
    {
      icon: 'fileText',
      label: 'Материалы',
      value: materialsCount,
      trend: propertyTypesCount > 0 ? `${propertyTypesCount} типов` : null,
      color: 'bg-cream/10',
    },
    {
      icon: 'users',
      label: 'Пользователи',
      value: usersCount,
      trend: `${partnerCount} партнёров`,
      color: 'bg-burgundy-light/30',
    },
    {
      icon: 'send',
      label: 'Лиды',
      value: totalLeadsCount,
      trend: `${conversionRate}% в работе`,
      color: 'bg-cream/10',
    },
    {
      icon: 'layoutGrid',
      label: 'Сторис',
      value: activeStoriesCount,
      trend: stories.length > 0 ? `${stories.length} всего` : null,
      color: 'bg-burgundy-light/30',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col min-h-screen bg-burgundy-dark relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 opacity-[0.04] pointer-events-none">
          <AbstractSkyline className="w-full h-80 text-cream" />
        </div>

        <main className="flex-1 px-6 lg:px-16 py-6 lg:py-10 pt-20 lg:pt-10 overflow-auto relative z-10">
          <section className="mb-12 lg:mb-14">
            <div className="mb-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <p className="text-cream/55 text-[10px] tracking-[0.3em] uppercase mb-3">
                  Панель управления
                </p>
                <h1 className="font-serif text-cream text-4xl lg:text-6xl font-semibold leading-[1.02] mb-3">
                  Добро пожаловать,
                  <br />
                  {session.user?.name || 'Администратор'}
                </h1>
                <p className="text-cream/60 max-w-2xl text-base lg:text-lg leading-relaxed">
                  Администраторская панель для контроля материалов, лидов, сторис и команды. Всё
                  подчинено одной задаче: быстро видеть состояние системы и действовать без
                  визуального шума.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-6">
              <div className="border border-white/10 bg-white/5 p-6 lg:p-8 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-cream/50 text-[10px] tracking-[0.28em] uppercase mb-3">
                      Администраторский обзор
                    </p>
                    <h2 className="font-serif text-2xl lg:text-3xl text-cream font-semibold">
                      Главное за сегодня
                    </h2>
                  </div>
                  <div className="hidden lg:flex h-12 w-12 items-center justify-center border border-white/10 bg-black/10">
                    <Sparkles className="h-5 w-5 text-cream" />
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <StatCard
                      key={stat.label}
                      {...stat}
                      delay={index * 0.06}
                      className="rounded-none"
                    />
                  ))}
                </div>
              </div>

              <div className="border border-white/10 bg-gradient-to-b from-white/5 to-burgundy/60 p-6 backdrop-blur-sm">
                <p className="text-cream/45 text-[10px] tracking-[0.28em] uppercase mb-3">
                  Управленческий статус
                </p>
                <h3 className="font-serif text-2xl text-cream font-semibold mb-4">
                  {roleLabels[userRole] || 'Администратор'}
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="border border-white/10 bg-black/10 p-4">
                    <p className="text-cream/45 text-[10px] tracking-[0.24em] uppercase mb-2">
                      География
                    </p>
                    <p className="font-serif text-4xl text-cream">{citiesCount}</p>
                    <p className="text-sm text-cream/55 mt-1">городов в актуальных материалах</p>
                  </div>
                  <div className="border border-white/10 bg-black/10 p-4">
                    <p className="text-cream/45 text-[10px] tracking-[0.24em] uppercase mb-2">
                      CRM-конверсия
                    </p>
                    <p className="font-serif text-4xl text-cream">{conversionRate}%</p>
                    <p className="text-sm text-cream/55 mt-1">лидов уже переданы в работу</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <p className="text-sm text-cream/60 leading-relaxed mb-5">
                    Здесь важен взгляд администратора: контент, команда, CRM и состояние клиентского
                    потока в одном ритме.
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

          <section className="mb-12 lg:mb-14">
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-6">
              <UploadMaterialCard />

              <div className="border border-white/10 bg-white/5 p-6 lg:p-8 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div>
                    <p className="text-cream/50 text-[10px] tracking-[0.28em] uppercase mb-3">
                      CRM и передачи
                    </p>
                    <h3 className="font-serif text-2xl lg:text-3xl text-cream font-semibold">
                      Воронка лидов
                    </h3>
                  </div>
                  <div className="h-12 w-12 border border-white/10 bg-black/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-cream" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="border border-white/10 bg-black/10 p-4">
                    <p className="font-serif text-3xl text-cream">{newLeadsCount}</p>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-cream/45 mt-1">
                      Новые
                    </p>
                  </div>
                  <div className="border border-white/10 bg-black/10 p-4">
                    <p className="font-serif text-3xl text-cream">{sentLeadsCount}</p>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-cream/45 mt-1">
                      В Bitrix
                    </p>
                  </div>
                  <div className="border border-white/10 bg-black/10 p-4">
                    <p className="font-serif text-3xl text-cream">{processedLeadsCount}</p>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-cream/45 mt-1">
                      Закрыто
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {recentLeads.length > 0 ? (
                    recentLeads.map(lead => (
                      <div
                        key={lead.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 border-b border-white/10 last:border-b-0"
                      >
                        <div>
                          <p className="text-cream text-sm font-medium">{lead.fullName}</p>
                          <p className="text-xs text-cream/50">
                            {lead.city} • {lead.user.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${leadStatusClasses[lead.status] ?? leadStatusClasses.NEW}`}
                          >
                            {leadStatusLabels[lead.status] ?? lead.status}
                          </span>
                          <span className="text-xs text-cream/45">
                            {new Date(lead.createdAt).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-cream/50">Передач клиентов пока не было.</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 lg:mb-14">
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-6">
              <div className="border border-white/10 bg-white/5 p-6 lg:p-8 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-cream/50 text-[10px] tracking-[0.28em] uppercase mb-3">
                      Последние загрузки
                    </p>
                    <h3 className="font-serif text-2xl lg:text-3xl text-cream font-semibold">
                      Материалы недели
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
                    <p className="text-sm text-cream/50">Материалы ещё не загружались.</p>
                  )}
                </div>
              </div>

              <div className="border border-white/10 bg-white/5 p-6 lg:p-8 backdrop-blur-sm">
                <p className="text-cream/50 text-[10px] tracking-[0.28em] uppercase mb-3">
                  Команда и роли
                </p>
                <h3 className="font-serif text-2xl text-cream font-semibold mb-6">
                  Состав кабинета
                </h3>

                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Администраторы', value: adminCount, icon: ShieldCheck },
                    { label: 'Менеджеры', value: managerCount, icon: UserCheck },
                    { label: 'Партнёры', value: partnerCount, icon: Users2 },
                  ].map(item => (
                    <div
                      key={item.label}
                      className="border border-white/10 bg-black/10 p-4 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 border border-white/10 bg-cream/10 flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-cream" />
                        </div>
                        <span className="text-sm text-cream">{item.label}</span>
                      </div>
                      <span className="font-serif text-3xl text-cream">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10 space-y-3">
                  {recentUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-cream">{user.name}</p>
                        <p className="text-xs text-cream/45">{user.email || 'Без email'}</p>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-cream/55">
                        {roleLabels[user.role] ?? user.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 lg:mb-14">
            <div className="border border-white/10 bg-white/5 p-6 lg:p-8 backdrop-blur-sm">
              <StoriesManager stories={stories} />
            </div>
          </section>

          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {adminGallery.map(card => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group relative min-h-[340px] overflow-hidden border border-white/10 bg-black/10"
                >
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[10px] text-white/60 tracking-[0.26em] uppercase mb-3">
                      ADMIN VIEW
                    </p>
                    <h3 className="font-serif text-2xl text-white mb-3">{card.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed mb-5">{card.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm text-white">
                      Открыть раздел
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <div className="border border-white/10 bg-gradient-to-br from-white/5 to-burgundy/40 p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">
                <div>
                  <p className="text-cream/50 text-[10px] tracking-[0.28em] uppercase mb-3">
                    Операционный стандарт
                  </p>
                  <h2 className="font-serif text-2xl lg:text-4xl text-cream font-semibold">
                    Как держать кабинет в актуальном состоянии
                  </h2>
                </div>
                <div className="border border-white/10 bg-black/10 px-5 py-4 max-w-sm">
                  <p className="text-sm text-cream/70 leading-relaxed">
                    Администраторский дашборд должен показывать состояние бизнеса с первого экрана:
                    где материалы, как движется CRM, что происходит с командой и контентом.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  {
                    step: '01',
                    title: 'Добавьте презентацию',
                    text: 'Загрузите PDF, укажите город и тип недвижимости для корректной фильтрации.',
                    icon: FileText,
                  },
                  {
                    step: '02',
                    title: 'Проверьте сторис',
                    text: 'Поддерживайте актуальные stories для главной страницы партнёрского кабинета.',
                    icon: Building2,
                  },
                  {
                    step: '03',
                    title: 'Отследите передачи',
                    text: 'Контролируйте новые лиды и проверяйте корректность маршрутизации в Bitrix.',
                    icon: PhoneCall,
                  },
                  {
                    step: '04',
                    title: 'Сверьте доступы',
                    text: 'Следите за ролями команды и чистотой клиентского пути без лишних барьеров.',
                    icon: CheckCircle2,
                  },
                ].map(item => (
                  <div key={item.step} className="border border-white/10 bg-black/10 p-5 lg:p-6">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-cream/45 text-[10px] tracking-[0.26em] uppercase">
                        Шаг {item.step}
                      </span>
                      <item.icon className="h-5 w-5 text-cream/70" />
                    </div>
                    <h3 className="text-cream text-lg font-medium mb-2">{item.title}</h3>
                    <p className="text-sm text-cream/60 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-3 text-cream/60 text-sm">
                  <Clock3 className="h-4 w-4" />
                  Производственный взгляд администратора: минимум визуального шума, максимум
                  управления
                </div>
                <Link
                  href="/materials"
                  className="inline-flex items-center gap-2 text-sm text-cream hover:text-white transition-colors"
                >
                  Перейти к публикациям
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <Sidebar
        user={{
          name: session.user?.name || 'Администратор',
          email: session.user?.email || '',
          role: userRole,
        }}
      />
    </div>
  );
}
