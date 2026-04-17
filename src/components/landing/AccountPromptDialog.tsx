'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface AccountPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: {
    name?: string | null;
    email?: string | null;
  };
}

export function AccountPromptDialog({ open, onOpenChange, user }: AccountPromptDialogProps) {
  const router = useRouter();

  const handleContinue = () => {
    onOpenChange(false);
    router.push('/dashboard');
  };

  const handleSwitchAccount = () => {
    onOpenChange(false);
    signOut({ callbackUrl: '/login' });
  };

  const initial = user?.name?.charAt(0).toUpperCase() || '?';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-cream border-cream-dark sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle className="font-serif text-2xl text-burgundy text-center">
            Вы уже авторизованы
          </DialogTitle>
          <DialogDescription className="text-center text-burgundy/80">
            Хотите продолжить работу с текущим аккаунтом?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          <div className="flex flex-col items-center gap-3">
            <div className="h-16 w-16 rounded-full bg-burgundy flex items-center justify-center text-cream text-2xl font-serif font-semibold">
              {initial}
            </div>
            <div className="text-center">
              <p className="font-medium text-burgundy">{user?.name || 'Партнёр'}</p>
              {user?.email && (
                <p className="text-sm text-burgundy/70">{user.email}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col w-full gap-3">
            <Button
              onClick={handleContinue}
              className="w-full bg-burgundy text-cream hover:bg-burgundy-medium font-bold tracking-wide"
            >
              Продолжить
            </Button>
            <Button
              onClick={handleSwitchAccount}
              variant="outline"
              className="w-full border-burgundy text-burgundy hover:bg-burgundy hover:text-cream font-bold tracking-wide"
            >
              Войти в другой аккаунт
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
