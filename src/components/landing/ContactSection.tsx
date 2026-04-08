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
      <section id="contacts" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-amber-500 text-sm font-semibold tracking-widest uppercase">
                Связаться с нами
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
                Подберём квартиру <br />
                специально для вас
              </h2>
              <p className="mt-4 text-slate-500 leading-relaxed">
                Оставьте заявку — свяжемся в течение 10 минут, выясним задачу и подберём варианты с
                учётом вашего бюджета и пожеланий.
              </p>

              <div className="mt-10 space-y-4">
                <a href="tel:+70000000000" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-white transition-all flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-0.5">Телефон</div>
                    <div className="font-semibold text-slate-900">+7 (000) 000-00-00</div>
                  </div>
                </a>

                <a href="mailto:info@profit-premium.ru" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-white transition-all flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-0.5">Email</div>
                    <div className="font-semibold text-slate-900">info@profit-premium.ru</div>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-0.5">Режим работы</div>
                    <div className="font-semibold text-slate-900">Пн–Пт: 9:00 – 20:00</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Заявка отправлена!</h3>
                  <p className="text-slate-500 text-sm">Свяжемся с вами в течение 10 минут</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Оставьте заявку</h3>
                  <p className="text-slate-500 text-sm mb-6">Свяжемся с вами в течение 10 минут</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Иван Иванов"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+7 (000) 000-00-00"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-amber-400/25 hover:-translate-y-0.5 text-sm"
                    >
                      Подобрать квартиру
                    </button>
                    <p className="text-xs text-slate-400 text-center">
                      Нажимая кнопку, вы соглашаетесь с{' '}
                      <a href="#" className="underline hover:text-slate-600">
                        политикой конфиденциальности
                      </a>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-amber-400 font-bold text-lg">PROFIT</span>
                <span className="text-white font-light text-lg tracking-widest">PREMIUM</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Агентство недвижимости полного цикла. Подбираем, покупаем и продаём с заботой о вас.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Разделы</h4>
              <ul className="space-y-2">
                {[
                  ['О нас', '#about'],
                  ['Услуги', '#services'],
                  ['Команда', '#team'],
                  ['Отзывы', '#reviews'],
                  ['Контакты', '#contacts'],
                ].map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Контакты</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="tel:+70000000000" className="hover:text-amber-400 transition-colors">
                    +7 (000) 000-00-00
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@profit-premium.ru"
                    className="hover:text-amber-400 transition-colors"
                  >
                    info@profit-premium.ru
                  </a>
                </li>
              </ul>
              <div className="flex gap-3 mt-5">
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-amber-400 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"
                  aria-label="Telegram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 14.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-amber-400 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.528 5.835L0 24l6.335-1.509A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.367l-.36-.213-3.716.885.933-3.617-.236-.371A9.818 9.818 0 1112 21.818z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-amber-400 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"
                  aria-label="ВКонтакте"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.598-.19 1.365 1.26 2.179 1.815.615.42 1.082.327 1.082.327l2.175-.03s1.137-.071.598-1.012c-.044-.074-.314-.664-1.619-1.875-1.365-1.265-1.183-1.06.462-3.246.999-1.33 1.399-2.142 1.273-2.491-.12-.332-.859-.244-.859-.244l-2.448.015s-.181-.025-.315.056c-.132.08-.217.267-.217.267s-.387 1.03-.903 1.906c-1.088 1.85-1.524 1.948-1.701 1.834-.413-.267-.31-1.073-.31-1.646 0-1.79.27-2.535-.527-2.726-.265-.064-.46-.106-1.139-.113-.871-.009-1.609.003-2.026.208-.278.136-.492.44-.361.457.161.021.527.099.721.363.25.341.241 1.107.241 1.107s.143 2.11-.335 2.372c-.327.18-.777-.188-1.741-1.876-.495-.859-.869-1.81-.869-1.81s-.072-.176-.202-.27c-.157-.115-.377-.151-.377-.151l-2.326.015s-.349.01-.477.162c-.114.135-.009.414-.009.414s1.826 4.271 3.891 6.423c1.895 1.973 4.047 1.843 4.047 1.843h.975z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs">
              © 2026 ООО &ldquo;Профит Премиум&rdquo;. Все права защищены.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-slate-400 text-xs transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-400 text-xs transition-colors">
                Пользовательское соглашение
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
