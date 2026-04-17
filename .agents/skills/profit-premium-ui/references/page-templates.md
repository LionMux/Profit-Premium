# Page Templates

Complete page layouts for Profit-Premium.

## Login Page (Split-Screen)

Based on Image1 (Whitewill style).

```tsx
// app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [authType, setAuthType] = useState<'email' | 'sms'>('email');
  const [isLoading, setIsLoading] = useState(false);

  // Form states...

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 bg-[#1a1a1a] flex flex-col justify-center px-8 lg:px-16 py-12">
        {/* Logo */}
        <div className="mb-12">
          <div className="text-[#C9A86C] font-serif">
            <div className="text-2xl tracking-wide">PROFIT</div>
            <div className="text-2xl tracking-widest font-semibold">PREMIUM</div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-3xl lg:text-4xl text-cream font-semibold mb-8">
          Вход в личный кабинет
        </h1>

        {/* Auth Type Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setAuthType('email')}
            className={`pb-2 text-sm font-medium transition-colors ${
              authType === 'email'
                ? 'text-[#C9A86C] border-b-2 border-[#C9A86C]'
                : 'text-cream/60 hover:text-cream'
            }`}
          >
            E-mail
          </button>
          <button
            onClick={() => setAuthType('sms')}
            className={`pb-2 text-sm font-medium transition-colors ${
              authType === 'sms'
                ? 'text-[#C9A86C] border-b-2 border-[#C9A86C]'
                : 'text-cream/60 hover:text-cream'
            }`}
          >
            По СМС
          </button>
        </div>

        {/* Form */}
        <form className="space-y-6 max-w-md">
          {authType === 'email' ? (
            <>
              <div>
                <label className="block text-sm text-cream/80 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="partner@example.com"
                  className="w-full px-4 py-3 bg-white text-burgundy-dark placeholder:text-gray-400 border-0"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-cream/80">Пароль</label>
                  <button type="button" className="text-sm text-cream/60 hover:text-cream">
                    показать пароль
                  </button>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white text-burgundy-dark placeholder:text-gray-400 border-0"
                />
              </div>
            </>
          ) : (
            <>{/* SMS form fields */}</>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#C9A86C] text-[#1a1a1a] font-medium hover:bg-[#D4BC94] transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>

          <label className="flex items-center gap-2 text-sm text-cream/80 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-[#C9A86C]" />
            Запомнить меня
          </label>
        </form>

        {/* Footer links */}
        <div className="mt-8">
          <a href="#" className="text-sm text-[#C9A86C] hover:underline">
            Забыли пароль?
          </a>
        </div>

        {/* Bottom text */}
        <div className="mt-auto pt-12">
          <p className="text-xs text-cream/40">
            Эксперты в недвижимости <span className="text-[#C9A86C]">profitpremium.ru</span>
          </p>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:block w-1/2 bg-gradient-to-br from-[#C9A86C] via-[#E0D5C5] to-[#5C1E2D]">
        {/* 3D City visualization placeholder */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-burgundy-dark/30">
            <div className="text-6xl mb-4">🏙️</div>
            <p className="font-serif text-xl">3D Визуализация</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Admin Dashboard

Based on Image2 style.

```tsx
// app/admin/page.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { StoriesCarousel } from '@/components/stories/StoriesCarousel';
import { ActionCard } from '@/components/ActionCard';
import { Upload, FileText, LayoutGrid } from 'lucide-react';

export default async function AdminPage() {
  const session = await auth();
  if (!session) redirect('/login');

  const stories = await fetchStories(); // Your data fetching

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-burgundy-dark">
        <main className="flex-1 p-6 lg:p-10">
          {/* Logo */}
          <div className="mb-10">
            <div className="text-cream font-serif">
              <div className="text-xl tracking-wide font-light">PROFIT</div>
              <div className="text-xl tracking-widest font-semibold">PREMIUM</div>
            </div>
          </div>

          {/* Stories Carousel */}
          <section className="mb-12">
            <StoriesCarousel stories={stories} />
            <p className="mt-6 text-cream/60 text-sm tracking-[0.2em] uppercase">
              Новости, старты продаж в формате сторис
            </p>
          </section>

          {/* Action Cards */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ActionCard
                icon={Upload}
                title="Загрузка материалов"
                description="Добавьте новую презентацию или документ"
                actionLabel="Открыть форму"
                onClick={() => {
                  /* Open upload modal */
                }}
              />
              <ActionCard
                icon={FileText}
                title="Материалы"
                description="Доступ к презентациям и документам"
                actionLabel="Перейти к материалам"
                href="/materials"
              />
              <ActionCard
                icon={LayoutGrid}
                title="Администрирование"
                description="Управление контентом и загрузка файлов"
                actionLabel="Открыть админку"
                href="/admin"
              />
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
```

## Profile Page

```tsx
// app/(dashboard)/profile/page.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { StoriesCarousel } from '@/components/stories/StoriesCarousel';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { ActionCard } from '@/components/ActionCard';
import { User, FileText, LayoutGrid, Send } from 'lucide-react';

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect('/login');

  const user = session.user;
  const stories = await fetchStories();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-burgundy-dark">
        <main className="flex-1 p-6 lg:p-10">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-4xl text-cream font-semibold mb-2">Личный кабинет</h1>
            <p className="text-cream/60">Управление профилем и передача клиентов в CRM</p>
          </div>

          {/* Stories */}
          <section className="mb-10">
            <StoriesCarousel stories={stories} />
          </section>

          {/* Action Cards */}
          <section className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ActionCard
                icon={Send}
                title="Передать клиента"
                description="Быстрая передача лида в CRM систему"
                actionLabel="Открыть форму"
                onClick={() => {
                  /* Open transfer modal */
                }}
              />
              <ActionCard
                icon={FileText}
                title="Материалы"
                description="Доступ к презентациям и документам"
                actionLabel="Перейти к материалам"
                href="/materials"
              />
              {user.role === 'ADMIN' && (
                <ActionCard
                  icon={LayoutGrid}
                  title="Администрирование"
                  description="Управление контентом и загрузка файлов"
                  actionLabel="Открыть админку"
                  href="/admin"
                />
              )}
            </div>
          </section>

          {/* Profile Info */}
          <section>
            <h2 className="font-serif text-2xl text-cream font-semibold mb-6">
              Информация о профиле
            </h2>
            <ProfileInfo user={user} />
          </section>
        </main>

        <Footer />
      </div>

      {/* Right Sidebar */}
      <Sidebar
        user={{
          name: user?.name || '',
          email: user?.email || '',
          role: (user?.role as 'ADMIN' | 'MANAGER' | 'PARTNER') || 'PARTNER',
        }}
      />
    </div>
  );
}
```

## Materials Listing Page

```tsx
// app/(dashboard)/materials/page.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { MaterialCard } from '@/components/materials/MaterialCard';
import { FilterBar } from '@/components/materials/FilterBar';

export default async function MaterialsPage({
  searchParams,
}: {
  searchParams: { city?: string; type?: string };
}) {
  const session = await auth();
  if (!session) redirect('/login');

  const materials = await fetchMaterials(searchParams);
  const cities = await fetchCities();
  const propertyTypes = await fetchPropertyTypes();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-burgundy-dark">
        <main className="flex-1 p-6 lg:p-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl text-cream font-semibold mb-2">Материалы</h1>
            <p className="text-cream/60">Презентации и документы по объектам недвижимости</p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <FilterBar
              label="Город"
              options={cities.map(c => ({ value: c, label: c }))}
              selected={searchParams.city || ''}
              onSelect={city => updateFilter('city', city)}
            />
            <FilterBar
              label="Тип недвижимости"
              options={propertyTypes.map(t => ({ value: t, label: t }))}
              selected={searchParams.type || ''}
              onSelect={type => updateFilter('type', type)}
            />
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map(material => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>

          {materials.length === 0 && (
            <div className="text-center py-16">
              <p className="text-cream/40">Материалы не найдены</p>
            </div>
          )}
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
```

## Layout Components

### Dashboard Layout

```tsx
// app/(dashboard)/layout.tsx
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Main Content Area - Burgundy Background */}
      <div className="flex-1 flex flex-col min-h-screen bg-burgundy-dark">
        <main className="flex-1 p-6 lg:p-10 overflow-auto">{children}</main>
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
```

### Auth Layout

```tsx
// app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}
```

## Data Fetching Patterns

```typescript
// lib/data.ts
import { prisma } from '@/lib/prisma';

export async function fetchStories() {
  return prisma.story.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });
}

export async function fetchMaterials(filters: { city?: string; type?: string }) {
  return prisma.material.findMany({
    where: {
      ...(filters.city && { city: filters.city }),
      ...(filters.type && { propertyType: filters.type }),
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function fetchCities() {
  const materials = await prisma.material.findMany({
    select: { city: true },
    distinct: ['city'],
  });
  return materials.map(m => m.city);
}
```
