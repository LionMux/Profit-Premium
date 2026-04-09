import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { TransferClientForm } from '@/components/profile/TransferClientForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { User, Send, FileText, Settings } from 'lucide-react';
import Link from 'next/link';
import { AbstractSkyline, GeometricCity } from '@/components/illustrations/BuildingIllustrations';

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const isAdmin = session.user?.role === 'ADMIN' || session.user?.role === 'MANAGER';

  return (
    <div className="space-y-8 relative">
      {/* Decorative skyline */}
      <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none w-96">
        <GeometricCity className="w-full h-48 text-cream" />
      </div>
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-cream">Личный кабинет</h1>
        <p className="text-sm text-cream/60 mt-2">
          Управление профилем и передача клиентов в CRM
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Transfer Client Card */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 relative overflow-hidden">
          <div className="absolute top-2 right-2 w-16 h-20 opacity-10">
            <AbstractSkyline className="w-full h-full text-cream" />
          </div>
          <CardHeader className="pb-3">
            <div className="h-10 w-10 rounded-lg bg-burgundy-light/50 flex items-center justify-center mb-2">
              <Send className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-cream text-lg">Передать клиента</CardTitle>
            <CardDescription className="text-cream/60">
              Быстрая передача лида в CRM систему
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <button 
                  type="button"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-cream text-burgundy-dark hover:bg-cream/90 rounded-md font-medium transition-colors cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  Открыть форму
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
          </CardContent>
        </Card>

        {/* Materials Card */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 relative overflow-hidden">
          <div className="absolute top-2 right-2 w-16 h-20 opacity-10">
            <GeometricCity className="w-full h-full text-cream" />
          </div>
          <CardHeader className="pb-3">
            <div className="h-10 w-10 rounded-lg bg-burgundy-light/50 flex items-center justify-center mb-2">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-cream text-lg">Материалы</CardTitle>
            <CardDescription className="text-cream/60">
              Доступ к презентациям и документам
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/materials">
              <Button variant="outline" className="w-full border-cream/30 text-cream hover:bg-white/10 hover:text-cream">
                <FileText className="mr-2 h-4 w-4" />
                Перейти к материалам
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Admin Card (only for admins) */}
        {isAdmin && (
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 rounded-lg bg-burgundy-light/50 flex items-center justify-center mb-2">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-cream text-lg">Администрирование</CardTitle>
              <CardDescription className="text-cream/60">
                Управление контентом и загрузка файлов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin">
                <Button variant="outline" className="w-full border-cream/30 text-cream hover:bg-white/10 hover:text-cream">
                  <Settings className="mr-2 h-4 w-4" />
                  Открыть админку
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Profile Info */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-full bg-cream flex items-center justify-center">
            <User className="h-6 w-6 text-burgundy-dark" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-cream">Информация о профиле</h2>
            <p className="text-sm text-cream/60">Ваши персональные данные</p>
          </div>
        </div>
        <ProfileInfo />
      </div>
    </div>
  );
}
