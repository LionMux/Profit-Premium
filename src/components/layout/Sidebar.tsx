'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import { FileText, User, Phone, Home, Send, LayoutGrid, ExternalLink, LogOut } from 'lucide-react';
import { TransferClientForm } from '@/components/profile/TransferClientForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface SidebarProps {
  user: {
    name: string;
    email: string;
    role: 'ADMIN' | 'MANAGER' | 'PARTNER';
  };
}

const navItems = [
  { href: '/dashboard', label: 'ГЛАВНАЯ', icon: Home },
  { href: '/materials', label: 'МАТЕРИАЛЫ', icon: FileText },
  { href: '/profile', label: 'ЛИЧНЫЙ КАБИНЕТ', icon: User },
  { href: '/contacts', label: 'КОНТАКТЫ', icon: Phone },
];

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-burgundy flex items-center justify-between px-6 h-14">
        <Link
          href="/dashboard"
          className="font-serif text-cream font-bold text-lg tracking-widest leading-none"
        >
          PROFIT PREMIUM
        </Link>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-cream p-1" aria-label="Меню">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile dropdown menu */}
      <div
        className={cn(
          'lg:hidden fixed top-14 left-0 right-0 z-50 bg-cream border-b border-cream-dark transition-all duration-300 ease-in-out',
          menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        )}
      >
        <nav className="flex flex-col p-6 gap-4">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3  transition-all duration-200',
                    isActive
                      ? 'bg-burgundy text-white shadow-md'
                      : 'text-burgundy-dark hover:bg-cream-dark/30'
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium text-sm tracking-wide">{item.label}</span>
                </Link>
              );
            })}
            {(user.role === 'ADMIN' || user.role === 'MANAGER') && (
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3  transition-all duration-200',
                  pathname === '/admin'
                    ? 'bg-burgundy text-white shadow-md'
                    : 'text-burgundy-dark hover:bg-cream-dark/30'
                )}
              >
                <LayoutGrid className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium text-sm tracking-wide">АДМИНКА</span>
              </Link>
            )}
            <div className="pt-4 border-t border-cream-dark/20">
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="w-full flex items-center justify-center gap-2 px-4 py-2  border border-burgundy/30 text-burgundy-dark hover:bg-burgundy hover:text-white transition-colors text-sm font-medium"
              >
                <LogOut className="h-4 w-4" />
                Выйти
              </button>
            </div>
          </nav>
        </div>

      <aside className="hidden lg:flex w-56 bg-cream flex-col h-screen sticky top-0 order-last border-l border-cream-dark">
      {/* Logo Area */}
      <div className="p-6 lg:p-8 border-b border-cream-dark/20">
        <Link href="/dashboard" className="block">
          <div className="text-burgundy-dark font-serif font-bold leading-none tracking-widest">
            <div className="text-2xl">PROFIT</div>
            <div className="text-2xl">PREMIUM</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 lg:p-6 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 lg:py-4  transition-all duration-200 group',
                isActive
                  ? 'bg-burgundy text-white shadow-md'
                  : 'text-burgundy-dark hover:bg-cream-dark/30'
              )}
            >
              <Icon
                className={cn('h-5 w-5 flex-shrink-0', isActive ? 'text-white' : 'text-burgundy')}
              />
              <span className="font-medium text-sm tracking-wide">{item.label}</span>
            </Link>
          );
        })}

        {/* Transfer Client Button */}
        <div className="pt-6 mt-6 border-t border-cream-dark/20">
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-4 h-auto bg-burgundy hover:bg-burgundy-medium text-white  transition-colors shadow-lg cursor-pointer"
              >
                <Send className="h-5 w-5" />
                <span className="font-medium tracking-wide">ПЕРЕДАТЬ КЛИЕНТА</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white">
              <DialogHeader>
                <DialogTitle className="text-burgundy-dark text-xl">Передать клиента</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Заполните форму ниже, чтобы передать клиента в CRM систему
                </DialogDescription>
              </DialogHeader>
              <TransferClientForm />
            </DialogContent>
          </Dialog>
        </div>

        {/* Admin Link (if admin/manager) */}
        {(user.role === 'ADMIN' || user.role === 'MANAGER') && (
          <div className="pt-4">
            <Link
              href="/admin"
              className={cn(
                'flex items-center gap-3 px-4 py-3 lg:py-4  transition-all duration-200',
                pathname === '/admin'
                  ? 'bg-burgundy text-white shadow-md'
                  : 'text-burgundy-dark hover:bg-cream-dark/30'
              )}
            >
              <LayoutGrid className="h-5 w-5 flex-shrink-0 text-burgundy" />
              <span className="font-medium text-sm tracking-wide">АДМИНКА</span>
            </Link>
          </div>
        )}

        {/* Back to website */}
        <div className="pt-6 mt-6 border-t border-cream-dark/20">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 lg:py-4  transition-all duration-200 text-burgundy-dark hover:bg-cream-dark/30"
          >
            <ExternalLink className="h-5 w-5 flex-shrink-0 text-burgundy" />
            <span className="font-medium text-sm tracking-wide">НА САЙТ</span>
          </Link>
        </div>
      </nav>

      {/* User Info */}
      <div className="p-4 lg:p-6 border-t border-cream-dark/20 bg-cream-dark/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-burgundy flex items-center justify-center text-white font-medium">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-burgundy-dark truncate">{user.name}</p>
            <p className="text-xs text-burgundy/60 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2  border border-burgundy/30 text-burgundy-dark hover:bg-burgundy hover:text-white transition-colors text-sm font-medium"
        >
          <LogOut className="h-4 w-4" />
          Выйти
        </button>
      </div>
    </aside>
    </>
  );
}
