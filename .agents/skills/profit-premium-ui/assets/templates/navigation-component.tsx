/**
 * Navigation Component Template
 * Use for: Sidebar, Header, Navigation links
 * Location: src/components/layout/
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, FileText, User, IconName } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/materials', label: 'Материалы', icon: FileText },
  { href: '/profile', label: 'Профиль', icon: User },
];

interface /*NavigationName*/Props {
  className?: string;
}

export function /*NavigationName*/({ className }: /*NavigationName*/Props) {
  const pathname = usePathname();

  return (
    <nav className={cn('space-y-2', className)}>
      {navItems.map((item) => {
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
    </nav>
  );
}
