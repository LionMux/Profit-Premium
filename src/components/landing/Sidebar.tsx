'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'О НАС', href: '#about' },
  { label: 'УСЛУГИ', href: '#services' },
  { label: 'КОМАНДА', href: '#team' },
  { label: 'ОТЗЫВЫ', href: '#reviews' },
  { label: 'КОНТАКТЫ', href: '#contacts' },
];

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop right sidebar */}
      <aside className="fixed right-0 top-0 h-screen w-56 bg-cream flex flex-col hidden lg:flex z-50 border-l border-cream-dark">
        <div className="p-8 pb-6 border-b border-cream-dark">
          <Link href="/" className="block">
            <div className="font-serif text-burgundy font-bold leading-none tracking-widest">
              <div className="text-2xl">PROFIT</div>
              <div className="text-2xl">PREMIUM</div>
            </div>
          </Link>
        </div>

        <nav className="flex flex-col p-8 gap-1 flex-1">
          <Link
            href="/login"
            className="mb-6 px-4 py-3 bg-burgundy text-cream text-xs font-bold tracking-[0.2em] text-center hover:bg-burgundy-medium transition-colors"
          >
            ЛИЧНЫЙ КАБИНЕТ
          </Link>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 text-xs font-bold tracking-[0.2em] text-burgundy hover:text-burgundy-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="p-8 pt-0">
          <a
            href="#contacts"
            className="block w-full py-3 border border-burgundy text-burgundy text-xs font-bold tracking-[0.2em] text-center hover:bg-burgundy hover:text-cream transition-all"
          >
            ОСТАВИТЬ ЗАЯВКУ
          </a>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-burgundy flex items-center justify-between px-6 h-14">
        <Link
          href="/"
          className="font-serif text-cream font-bold text-lg tracking-widest leading-none"
        >
          PROFIT PREMIUM
        </Link>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-cream p-1" aria-label="Меню">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="lg:hidden fixed top-14 left-0 right-0 z-50 bg-cream border-b border-cream-dark">
          <nav className="flex flex-col p-6 gap-4">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 bg-burgundy text-cream text-xs font-bold tracking-[0.2em] text-center"
            >
              ЛИЧНЫЙ КАБИНЕТ
            </Link>
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-1 text-xs font-bold tracking-[0.2em] text-burgundy"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
