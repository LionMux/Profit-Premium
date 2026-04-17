'use client';

import { useSession } from 'next-auth/react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Shield, Loader2 } from 'lucide-react';

export function ProfileInfo() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-burgundy/10  animate-pulse" />
        <div className="h-10 bg-burgundy/10  animate-pulse" />
        <div className="h-10 bg-burgundy/10  animate-pulse" />
      </div>
    );
  }

  const user = session?.user;

  const roleLabels: Record<string, string> = {
    ADMIN: 'Администратор',
    MANAGER: 'Менеджер',
    PARTNER: 'Партнёр',
  };

  const roleColors: Record<string, string> = {
    ADMIN: 'bg-burgundy/20 text-burgundy-dark border-burgundy/30 rounded-none',
    MANAGER: 'bg-burgundy/15 text-burgundy-dark border-burgundy/20 rounded-none',
    PARTNER: 'bg-burgundy/10 text-burgundy-dark border-burgundy/20 rounded-none',
  };

  return (
    <div className="space-y-4">
      {/* Name */}
      <div className="flex items-start gap-4">
        <div className="h-10 w-10  bg-burgundy/10 flex items-center justify-center flex-shrink-0">
          <User className="h-5 w-5 text-burgundy-dark/70" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-burgundy-dark/60 mb-1">Имя</p>
          <p className="font-medium text-burgundy-dark">{user?.name || 'Не указано'}</p>
        </div>
      </div>

      <Separator className="bg-cream-dark/50" />

      {/* Email */}
      <div className="flex items-start gap-4">
        <div className="h-10 w-10  bg-burgundy/10 flex items-center justify-center flex-shrink-0">
          <Mail className="h-5 w-5 text-burgundy-dark/70" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-burgundy-dark/60 mb-1">Email</p>
          <p className="font-medium text-burgundy-dark">{user?.email || 'Не указан'}</p>
        </div>
      </div>

      <Separator className="bg-cream-dark/50" />

      {/* Role */}
      <div className="flex items-start gap-4">
        <div className="h-10 w-10  bg-burgundy/10 flex items-center justify-center flex-shrink-0">
          <Shield className="h-5 w-5 text-burgundy-dark/70" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-burgundy-dark/60 mb-1">Роль</p>
          <Badge
            variant="outline"
            className={roleColors[user?.role || 'PARTNER'] || roleColors.PARTNER}
          >
            {roleLabels[user?.role || 'PARTNER'] || roleLabels.PARTNER}
          </Badge>
        </div>
      </div>
    </div>
  );
}
