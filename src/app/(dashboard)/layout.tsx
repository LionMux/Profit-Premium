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
      <div className="flex-1 flex flex-col min-h-screen bg-burgundy-dark">
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-auto">
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
