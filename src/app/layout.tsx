import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Cormorant_Garamond } from 'next/font/google';
import '@/styles/globals.css';
import { SessionProvider } from '@/components/providers/SessionProvider';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  title: 'Profit Premium — Личный кабинет партнёра',
  description:
    'Закрытый личный кабинет для партнёров-агентов по недвижимости. Доступ к материалам объектов и инструментам передачи клиентов.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${cormorant.variable} font-sans`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
