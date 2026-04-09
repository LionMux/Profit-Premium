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
        <div className="h-10 bg-white/10 rounded animate-pulse" />
        <div className="h-10 bg-white/10 rounded animate-pulse" />
        <div className="h-10 bg-white/10 rounded animate-pulse" />
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
    ADMIN: 'bg-red-500/20 text-red-200 border-red-500/30',
    MANAGER: 'bg-blue-500/20 text-blue-200 border-blue-500/30',
    PARTNER: 'bg-green-500/20 text-green-200 border-green-500/30',
  };

  return (
    <div className="space-y-4">
      {/* Name */}
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
          <User className="h-5 w-5 text-cream/80" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-cream/60 mb-1">Имя</p>
          <p className="font-medium text-cream">{user?.name || 'Не указано'}</p>
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Email */}
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
          <Mail className="h-5 w-5 text-cream/80" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-cream/60 mb-1">Email</p>
          <p className="font-medium text-cream">{user?.email || 'Не указан'}</p>
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Role */}
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
          <Shield className="h-5 w-5 text-cream/80" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-cream/60 mb-1">Роль</p>
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
