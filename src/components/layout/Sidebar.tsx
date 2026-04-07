'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { FileText, User, Phone, Home, PlusCircle } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/materials', label: 'Материалы', icon: FileText },
  { href: '/profile', label: 'Профиль', icon: User },
  { href: '/contacts', label: 'Контакты', icon: Phone },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] border-l bg-background sticky top-16">
      <nav className="p-4 space-y-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t">
          <Link
            href="/profile?transfer=true"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            <span className="font-medium">Передать клиента</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
