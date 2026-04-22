'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'ГЛАВНАЯ', href: '/dashboard' },
    { label: 'МАТЕРИАЛЫ', href: '/materials' },
    { label: 'ПРОФИЛЬ', href: '/profile' },
    { label: 'КОНТАКТЫ', href: '/contacts' },
  ];

  const socialLinks = [
    { label: 'TG', href: 'https://t.me/profitpremium' },
    { label: 'WA', href: 'https://wa.me/79991234567' },
    { label: 'ВК', href: 'https://vk.com/profitpremium' },
  ];

  return (
    <footer className="relative z-10 border-t border-white/10 bg-burgundy-dark">
      <div className="px-6 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Logo & Description */}
          <div>
            <div className="font-serif text-cream font-bold text-xl tracking-widest mb-4">
              PROFIT PREMIUM
            </div>
            <p className="text-cream/60 text-xs tracking-wider leading-relaxed">
              Закрытый клуб для партнеров по недвижимости. Эксклюзивные объекты, персональный
              менеджер, быстрое оформление сделок.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-cream text-[10px] font-bold tracking-[0.3em] mb-5">РАЗДЕЛЫ</h4>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/60 text-[10px] tracking-[0.2em] hover:text-cream transition-colors uppercase"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-cream text-[10px] font-bold tracking-[0.3em] mb-5">СОЦСЕТИ</h4>
            <div className="flex gap-3">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/20 text-cream/60 hover:border-cream hover:text-cream flex items-center justify-center text-[10px] font-bold tracking-wider transition-colors"
                  aria-label={social.label}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/40 text-[10px] tracking-[0.2em]">
            © {currentYear} ООО &quot;ПРОФИТ ПРЕМИУМ&quot;. ВСЕ ПРАВА ЗАЩИЩЕНЫ.
          </p>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-cream/40 text-[10px] tracking-widest hover:text-cream transition-colors"
            >
              КОНФИДЕНЦИАЛЬНОСТЬ
            </a>
            <a
              href="#"
              className="text-cream/40 text-[10px] tracking-widest hover:text-cream transition-colors"
            >
              СОГЛАШЕНИЕ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
