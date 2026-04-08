import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Cormorant_Garamond } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  title: 'Profit Premium — Агентство недвижимости',
  description:
    'Подбираем квартиры в новостройках и на вторичном рынке. Бесплатно для покупателей. Ипотека, рассрочка, trade-in.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${cormorant.variable} font-sans`}>{children}</body>
    </html>
  );
}
