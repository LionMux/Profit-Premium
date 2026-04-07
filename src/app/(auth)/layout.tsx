import { ToastProvider } from '@/components/ui/use-toast';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ToastProvider>{children}</ToastProvider>;
}
