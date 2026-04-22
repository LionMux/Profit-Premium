import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Main Content Area - Burgundy Background */}
      <div className="flex-1 flex flex-col min-h-screen bg-burgundy-dark relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-[0.02] pointer-events-none">
          <div className="w-full h-full rounded-full bg-cream blur-3xl" />
        </div>

        {/* Main Content */}
        <main className="flex-1 px-6 lg:px-16 py-6 lg:py-10 pt-20 lg:pt-10 overflow-auto relative z-10">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Right Sidebar */}
      <Sidebar
        user={{
          name: session.user?.name || '',
          email: session.user?.email || '',
          role: (session.user?.role as 'ADMIN' | 'MANAGER' | 'PARTNER') || 'PARTNER',
        }}
      />
    </div>
  );
}
