'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="h-16 border-b bg-background sticky top-0 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Profit Premium
        </Link>

        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {user.name || user.email}
          </div>
          <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: '/login' })}>
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
}
