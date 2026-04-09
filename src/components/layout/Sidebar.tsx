'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { FileText, User, Phone, Home, Send, LayoutGrid, ExternalLink } from 'lucide-react';
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

  return (
    <aside className="w-full lg:w-72 bg-cream flex flex-col lg:h-screen lg:sticky lg:top-0 order-first lg:order-last">
      {/* Logo Area */}
      <div className="p-6 lg:p-8 border-b border-cream-dark/20">
        <Link href="/dashboard" className="block">
          <div className="text-burgundy-dark font-serif">
            <div className="text-xl lg:text-2xl tracking-wide leading-tight">
              <span className="font-light">PROFIT</span>
            </div>
            <div className="text-xl lg:text-2xl tracking-widest font-semibold leading-tight">
              PREMIUM
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 lg:p-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 lg:py-4 rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-burgundy text-white shadow-md'
                  : 'text-burgundy-dark hover:bg-cream-dark/30'
              )}
            >
              <Icon className={cn('h-5 w-5 flex-shrink-0', isActive ? 'text-white' : 'text-burgundy')} />
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
                className="w-full flex items-center justify-center gap-3 px-4 py-4 h-auto bg-burgundy hover:bg-burgundy-medium text-white rounded-lg transition-colors shadow-lg cursor-pointer"
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
                'flex items-center gap-3 px-4 py-3 lg:py-4 rounded-lg transition-all duration-200',
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
            className="flex items-center gap-3 px-4 py-3 lg:py-4 rounded-lg transition-all duration-200 text-burgundy-dark hover:bg-cream-dark/30"
          >
            <ExternalLink className="h-5 w-5 flex-shrink-0 text-burgundy" />
            <span className="font-medium text-sm tracking-wide">НА САЙТ</span>
          </Link>
        </div>
      </nav>

      {/* User Info */}
      <div className="p-4 lg:p-6 border-t border-cream-dark/20 bg-cream-dark/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-burgundy flex items-center justify-center text-white font-medium">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-burgundy-dark truncate">{user.name}</p>
            <p className="text-xs text-burgundy/60 truncate">{user.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
