import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { StoriesCarousel } from '@/components/stories/StoriesCarousel';
import { UploadCard } from '@/components/admin/UploadCard';
import { ActionCard } from '@/components/admin/ActionCard';
import { FileText, LayoutGrid, Users, Building2 } from 'lucide-react';
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

  // Fetch stories for the carousel
  const stories = await prisma.story.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  // Fetch stats
  const materialsCount = await prisma.material.count();
  const usersCount = await prisma.user.count();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Main Content Area - Burgundy Background */}
      <div className="flex-1 flex flex-col min-h-screen bg-burgundy-dark relative overflow-hidden">
        {/* Decorative skyline background */}
        <div className="absolute bottom-0 left-0 right-0 opacity-5 pointer-events-none">
          <AbstractSkyline className="w-full h-64 text-cream" />
        </div>
        
        <main className="flex-1 p-6 lg:p-10 overflow-auto relative z-10">
          {/* Logo */}
          <div className="mb-10">
            <div className="text-cream font-serif">
              <div className="text-xl tracking-[0.3em] font-light">PROFIT</div>
              <div className="text-xl tracking-[0.4em] font-semibold">PREMIUM</div>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl lg:text-5xl text-cream font-semibold mb-2">
              Админ-панель
            </h1>
            <p className="text-cream/60 text-lg">
              Управление контентом и материалами
            </p>
          </div>

          {/* Stories Section */}
          <section className="mb-12">
            <div className="mb-6">
              <h2 className="text-cream/80 text-sm tracking-widest uppercase font-medium">
                Новости, старты продаж в формате сторис
              </h2>
            </div>
            <StoriesCarousel stories={stories} />
          </section>

          {/* Stats Cards */}
          <section className="mb-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative">
              <div className="bg-cream/5 backdrop-blur-sm border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-5 h-5 text-cream/60" />
                  <span className="text-cream/60 text-sm">Материалы</span>
                </div>
                <div className="font-serif text-3xl text-cream">{materialsCount}</div>
              </div>
              <div className="bg-cream/5 backdrop-blur-sm border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-cream/60" />
                  <span className="text-cream/60 text-sm">Пользователи</span>
                </div>
                <div className="font-serif text-3xl text-cream">{usersCount}</div>
              </div>
              <div className="bg-cream/5 backdrop-blur-sm border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="w-5 h-5 text-cream/60" />
                  <span className="text-cream/60 text-sm">Города</span>
                </div>
                <div className="font-serif text-3xl text-cream">—</div>
              </div>
              <div className="bg-cream/5 backdrop-blur-sm border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <LayoutGrid className="w-5 h-5 text-cream/60" />
                  <span className="text-cream/60 text-sm">Объекты</span>
                </div>
                <div className="font-serif text-3xl text-cream">—</div>
              </div>
            </div>
          </section>

          {/* Action Cards */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-cream font-semibold mb-6">
              Быстрые действия
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <UploadCard />
              <ActionCard
                icon={FileText}
                title="Материалы"
                description="Просмотр и управление всеми материалами"
                actionLabel="Перейти к материалам"
                href="/materials"
              />
              <ActionCard
                icon={LayoutGrid}
                title="Главная"
                description="Вернуться на главную страницу"
                actionLabel="На главную"
                href="/dashboard"
              />
            </div>
          </section>

          {/* Recent Activity or Info */}
          <section className="mb-12">
            <div className="bg-cream/5 backdrop-blur-sm border border-white/10 p-6 lg:p-8">
              <h3 className="font-serif text-xl text-cream font-semibold mb-4">
                Инструкция по загрузке
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-cream/70">
                <div className="space-y-3">
                  <p className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cream/20 flex items-center justify-center flex-shrink-0 text-sm">1</span>
                    <span>Заполните название и описание объекта</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cream/20 flex items-center justify-center flex-shrink-0 text-sm">2</span>
                    <span>Укажите город и тип недвижимости</span>
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cream/20 flex items-center justify-center flex-shrink-0 text-sm">3</span>
                    <span>Загрузите PDF-презентацию</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cream/20 flex items-center justify-center flex-shrink-0 text-sm">4</span>
                    <span>Добавьте обложку (опционально)</span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      {/* Right Sidebar */}
      <Sidebar
        user={{
          name: session.user?.name || '',
          email: session.user?.email || '',
          role: (session.user?.role as 'ADMIN' | 'MANAGER' | 'PARTNER') || 'PARTNER',
        }}
      />
    </div>
  );
}
