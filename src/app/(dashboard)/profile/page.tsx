import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { TransferClientDialog } from '@/components/profile/TransferClientDialog';
import { FileText, Send, Settings, User, Shield, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { AbstractSkyline, GeometricCity } from '@/components/illustrations/BuildingIllustrations';

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const isAdmin = session.user?.role === 'ADMIN' || session.user?.role === 'MANAGER';
  const userName = session.user?.name || 'Партнёр';
  const userEmail = session.user?.email || '';
  const userRole = session.user?.role || 'PARTNER';

  const clientLeadsCount = await prisma.clientLead.count({
    where: { userId: session.user.id },
  });

  const roleLabels: Record<string, string> = {
    ADMIN: 'Администратор',
    MANAGER: 'Менеджер',
    PARTNER: 'Партнёр',
  };

  return (
    <div className="min-h-[calc(100vh-200px)] relative">
      {/* Decorative Background */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-[0.06] pointer-events-none">
        <GeometricCity className="w-full h-full text-cream" />
      </div>

      {/* Header Section */}
      <section className="mb-10">
        <p className="text-cream/60 text-[10px] tracking-[0.3em] mb-3 uppercase">
          Управление профилем
        </p>
        <h1 className="font-serif text-cream text-4xl lg:text-5xl font-semibold mb-3 uppercase tracking-wide leading-tight">
          Личный кабинет
        </h1>
        <p className="text-cream/60 max-w-lg leading-relaxed">
          Управляйте своими данными и передавайте клиентов в CRM систему.
        </p>

        {/* Stats Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-8">
          <div>
            <p className="font-serif text-2xl text-cream">{clientLeadsCount}</p>
            <p className="text-[10px] text-cream/50 tracking-[0.2em] uppercase">Передано клиентов</p>
          </div>
          <div>
            <p className="font-serif text-2xl text-cream">{roleLabels[userRole]}</p>
            <p className="text-[10px] text-cream/50 tracking-[0.2em] uppercase">Статус аккаунта</p>
          </div>
          <div>
            <p className="font-serif text-2xl text-cream">24ч</p>
            <p className="text-[10px] text-cream/50 tracking-[0.2em] uppercase">Время ответа</p>
          </div>
        </div>
      </section>

      {/* User Info Card */}
      <section className="mb-10">
        <div className="bg-burgundy border border-white/10  p-6 lg:p-8 relative overflow-hidden group transition-all duration-500">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-48 h-48 opacity-[0.06] pointer-events-none">
            <AbstractSkyline className="w-full h-full text-cream" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Avatar */}
            <div className="h-20 w-20 bg-burgundy flex items-center justify-center flex-shrink-0">
              <span className="text-cream font-serif text-2xl font-bold">{userName.charAt(0).toUpperCase()}</span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-serif text-2xl text-cream font-semibold">
                  {userName}
                </h2>
                <span className="px-3 py-1 bg-burgundy-light text-[10px] text-cream uppercase tracking-[0.2em]">
                  {roleLabels[userRole]}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-cream/60">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{userEmail}</span>
                </div>
                {isAdmin && (
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-burgundy-light" />
                    <span className="text-burgundy-light">Полный доступ</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="mb-10">
        <p className="text-cream/60 text-[10px] tracking-[0.3em] mb-6 uppercase">
          Быстрые действия
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-cream-dark/20">
          {/* Transfer Client Card */}
          <div className="bg-burgundy border border-white/10  p-6 relative overflow-hidden group transition-all duration-500">
            <div className="absolute top-4 right-4 w-16 h-16 opacity-[0.06]">
              <AbstractSkyline className="w-full h-full text-cream" />
            </div>

            <div className="h-12 w-12  bg-burgundy-light/50 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
              <Send className="h-6 w-6 text-white" />
            </div>

            <h3 className="text-sm font-bold tracking-[0.2em] text-cream mb-2">
              ПЕРЕДАТЬ КЛИЕНТА
            </h3>
            <p className="text-sm text-cream/60 mb-5 leading-relaxed">
              Быстрая передача лида в CRM систему
            </p>

            <TransferClientDialog />
          </div>

          {/* Materials Card */}
          <Link
            href="/materials"
            className="bg-burgundy border border-white/10  p-6 relative overflow-hidden group transition-all duration-500 block"
          >
            <div className="absolute top-4 right-4 w-16 h-16 opacity-[0.06]">
              <GeometricCity className="w-full h-full text-cream" />
            </div>

            <div className="h-12 w-12  bg-burgundy-light/50 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
              <FileText className="h-6 w-6 text-white" />
            </div>

            <h3 className="text-sm font-bold tracking-[0.2em] text-cream mb-2">
              МАТЕРИАЛЫ
            </h3>
            <p className="text-sm text-cream/60 mb-5 leading-relaxed">
              Доступ к презентациям и документам
            </p>

            <span className="inline-flex items-center gap-2 text-sm text-cream/60 group-hover:text-cream transition-colors">
              Перейти
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>

          </Link>

          {/* Admin Card (only for admins) */}
          {isAdmin && (
            <Link
              href="/admin"
              className="bg-burgundy border border-white/10  p-6 relative overflow-hidden group transition-all duration-500 block"
            >
              <div className="h-12 w-12  bg-burgundy-light/50 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                <Settings className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-sm font-bold tracking-[0.2em] text-cream mb-2">
                АДМИНИСТРИРОВАНИЕ
              </h3>
              <p className="text-sm text-cream/60 mb-5 leading-relaxed">
                Управление контентом и загрузка файлов
              </p>

              <span className="inline-flex items-center gap-2 text-sm text-cream/60 group-hover:text-cream transition-colors">
                Открыть панель
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>

            </Link>
          )}
        </div>
      </section>

      {/* Profile Details */}
      <section className="bg-cream -mx-6 lg:-mx-16 px-6 lg:px-16 py-10">
        <p className="text-burgundy-dark/60 text-[10px] tracking-[0.3em] mb-6 uppercase">
          Информация о профиле
        </p>

        <div className="bg-white border border-cream-dark/20  p-6 lg:p-8">
          <ProfileInfo />
        </div>
      </section>
    </div>
  );
}
