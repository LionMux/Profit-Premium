'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'О нас', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Команда', href: '#team' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-amber-400 font-bold text-xl tracking-tight">PROFIT</span>
            <span className="text-white font-light text-xl tracking-widest">PREMIUM</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-amber-400 text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contacts"
              className="px-4 py-2 text-sm font-medium text-slate-900 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
            >
              Оставить заявку
            </a>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-300 border border-slate-600 rounded-lg hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              Кабинет партнёра
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-slate-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Открыть меню"
          >
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
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-3">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 text-slate-300 hover:text-amber-400 text-sm font-medium transition-colors rounded-lg hover:bg-slate-800"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-slate-800">
              <a
                href="#contacts"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium text-center text-slate-900 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
              >
                Оставить заявку
              </a>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-center text-slate-300 border border-slate-600 rounded-lg hover:border-amber-400 hover:text-amber-400 transition-colors"
              >
                Кабинет партнёра
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
