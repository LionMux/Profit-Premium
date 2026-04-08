import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={session.user} />
      <div className="flex">
        <main className="flex-1 p-6">{children}</main>
        <Sidebar />
      </div>
    </div>
  );
}
