const stats = [
  { value: '500+', label: 'Успешных сделок' },
  { value: '8 лет', label: 'На рынке недвижимости' },
  { value: '0 ₽', label: 'Стоимость услуг для вас' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Агентство недвижимости
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Найдём вашу{' '}
            <span className="text-amber-400">идеальную</span>{' '}
            квартиру
          </h1>

          <p className="text-lg text-slate-400 mb-10 max-w-2xl leading-relaxed">
            Помогаем выбрать, купить и оформить недвижимость. Работаем с застройщиками
            напрямую — наши услуги для вас бесплатны.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a
              href="#contacts"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-900 bg-amber-400 rounded-xl hover:bg-amber-300 transition-all hover:shadow-lg hover:shadow-amber-400/25 hover:-translate-y-0.5"
            >
              Подобрать квартиру
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-300 border border-slate-700 rounded-xl hover:border-slate-500 hover:text-white transition-all"
            >
              Узнать больше
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-800">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold text-amber-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
