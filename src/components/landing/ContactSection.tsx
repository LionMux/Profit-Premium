'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section id="contacts" className="bg-cream py-24 px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-burgundy-light text-[10px] tracking-[0.3em] mb-4">
              СВЯЗАТЬСЯ С НАМИ
            </p>
            <h2 className="font-serif text-burgundy text-4xl lg:text-5xl font-semibold uppercase leading-tight mb-10">
              Подберём
              <br />
              квартиру
              <br />
              для вас
            </h2>

            <div className="space-y-6">
              <a href="tel:+70000000000" className="flex items-center gap-5 group">
                <div className="w-10 h-10 border border-burgundy flex items-center justify-center flex-shrink-0 group-hover:bg-burgundy transition-colors">
                  <svg
                    className="w-4 h-4 text-burgundy group-hover:text-cream transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.2em] text-burgundy-light mb-1">
                    ТЕЛЕФОН
                  </div>
                  <div className="text-burgundy text-sm font-semibold tracking-wider">
                    +7 (000) 000-00-00
                  </div>
                </div>
              </a>

              <a href="mailto:info@profit-premium.ru" className="flex items-center gap-5 group">
                <div className="w-10 h-10 border border-burgundy flex items-center justify-center flex-shrink-0 group-hover:bg-burgundy transition-colors">
                  <svg
                    className="w-4 h-4 text-burgundy group-hover:text-cream transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.2em] text-burgundy-light mb-1">EMAIL</div>
                  <div className="text-burgundy text-sm font-semibold tracking-wider">
                    info@profit-premium.ru
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-5">
                <div className="w-10 h-10 border border-burgundy flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-burgundy"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.2em] text-burgundy-light mb-1">
                    РЕЖИМ РАБОТЫ
                  </div>
                  <div className="text-burgundy text-sm font-semibold tracking-wider">
                    ПН–ПТ: 9:00 – 20:00
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-cream-dark p-8 lg:p-10">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-12 h-12 bg-burgundy flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-cream"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-burgundy text-2xl font-semibold uppercase mb-3">
                  Заявка отправлена
                </h3>
                <p className="text-burgundy-light text-sm tracking-widest">
                  СВЯЖЕМСЯ В ТЕЧЕНИЕ 10 МИНУТ
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-burgundy text-2xl font-semibold uppercase mb-2">
                  Оставьте заявку
                </h3>
                <p className="text-burgundy-light text-[10px] tracking-[0.2em] mb-8">
                  СВЯЖЕМСЯ В ТЕЧЕНИЕ 10 МИНУТ
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-burgundy mb-2">
                      ВАШЕ ИМЯ
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Иван Иванов"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 border border-cream-dark bg-cream-light text-burgundy placeholder-burgundy-light focus:outline-none focus:border-burgundy transition-colors text-sm tracking-wider"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-burgundy mb-2">
                      ТЕЛЕФОН
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (000) 000-00-00"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-cream-dark bg-cream-light text-burgundy placeholder-burgundy-light focus:outline-none focus:border-burgundy transition-colors text-sm tracking-wider"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-burgundy text-cream text-xs font-bold tracking-[0.3em] hover:bg-burgundy-medium transition-colors"
                  >
                    ПОДОБРАТЬ КВАРТИРУ
                  </button>
                  <p className="text-[10px] tracking-widest text-burgundy-light text-center">
                    НАЖИМАЯ КНОПКУ, ВЫ СОГЛАШАЕТЕСЬ С{' '}
                    <a href="#" className="underline hover:text-burgundy">
                      ПОЛИТИКОЙ КОНФИДЕНЦИАЛЬНОСТИ
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-burgundy-dark border-t border-burgundy-medium px-10 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="font-serif text-cream font-bold text-xl tracking-widest mb-4">
              PROFIT PREMIUM
            </div>
            <p className="text-cream-dark text-xs tracking-wider leading-relaxed">
              Агентство недвижимости полного цикла. Подбираем, покупаем и продаём с заботой о вас.
            </p>
          </div>

          <div>
            <h4 className="text-cream text-[10px] font-bold tracking-[0.3em] mb-5">РАЗДЕЛЫ</h4>
            <ul className="space-y-3">
              {[
                ['О НАС', '#about'],
                ['УСЛУГИ', '#services'],
                ['КОМАНДА', '#team'],
                ['ОТЗЫВЫ', '#reviews'],
                ['КОНТАКТЫ', '#contacts'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-cream-dark text-[10px] tracking-[0.2em] hover:text-cream transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cream text-[10px] font-bold tracking-[0.3em] mb-5">СОЦСЕТИ</h4>
            <div className="flex gap-3">
              {[
                { label: 'TG', href: '#' },
                { label: 'WA', href: '#' },
                { label: 'ВК', href: '#' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-10 h-10 border border-burgundy-medium text-cream-dark hover:border-cream hover:text-cream flex items-center justify-center text-[10px] font-bold tracking-wider transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-burgundy-medium pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream-dark text-[10px] tracking-[0.2em]">
            © 2026 ООО &ldquo;ПРОФИТ ПРЕМИУМ&rdquo;. ВСЕ ПРАВА ЗАЩИЩЕНЫ.
          </p>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-cream-dark text-[10px] tracking-widest hover:text-cream transition-colors"
            >
              КОНФИДЕНЦИАЛЬНОСТЬ
            </a>
            <a
              href="#"
              className="text-cream-dark text-[10px] tracking-widest hover:text-cream transition-colors"
            >
              СОГЛАШЕНИЕ
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
