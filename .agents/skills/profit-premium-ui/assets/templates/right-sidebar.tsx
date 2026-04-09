/**
 * Right Sidebar Component
 * Use for: Dashboard layout with right-side navigation
 * Location: src/components/layout/Sidebar.tsx
 * 
 * Features:
 * - Fixed right position
 * - User info display
 * - Navigation links with icons
 * - Active state highlighting
 * - Responsive (hidden on mobile)
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Home, FileText, User, Phone, LogOut } from 'lucide-react';

interface User {
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'PARTNER';
}

interface SidebarProps {
  user: User;
  className?: string;
}

const navItems = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/materials', label: 'Материалы', icon: FileText },
  { href: '/profile', label: 'Профиль', icon: User },
  { href: '/contacts', label: 'Контакты', icon: Phone },
];

export function Sidebar({ user, className }: SidebarProps) {
  const pathname = usePathname();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleLabel = (role: User['role']) => {
    switch (role) {
      case 'ADMIN':
        return 'Администратор';
      case 'MANAGER':
        return 'Менеджер';
      case 'PARTNER':
        return 'Партнер';
      default:
        return role;
    }
  };

  return (
    <aside
      className={cn(
        'fixed right-0 top-0 h-screen w-64 bg-card border-l z-40',
        'flex flex-col',
        className
      )}
    >
      {/* User Info */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            <p className="text-xs text-primary">{getRoleLabel(user.role)}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={() => {
            // Handle logout
            window.location.href = '/api/auth/signout';
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors w-full
                     text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Выйти</span>
        </button>
      </div>
    </aside>
  );
}
