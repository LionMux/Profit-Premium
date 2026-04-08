const stats = [
  { value: '500+', label: 'УСПЕШНЫХ СДЕЛОК' },
  { value: '8 ЛЕТ', label: 'НА РЫНКЕ' },
  { value: '0 ₽', label: 'СТОИМОСТЬ УСЛУГ' },
];

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-burgundy flex flex-col justify-between pt-14 lg:pt-0">
      <div className="flex-1 flex flex-col justify-center px-10 lg:px-16 py-20">
        <p className="text-cream-dark text-xs tracking-[0.3em] mb-6">АГЕНТСТВО НЕДВИЖИМОСТИ</p>

        <h1 className="font-serif text-cream text-5xl sm:text-6xl lg:text-7xl font-semibold leading-none tracking-wide mb-8 uppercase">
          Найдём
          <br />
          вашу
          <br />
          квартиру
        </h1>

        <p className="text-cream-dark text-sm tracking-widest max-w-sm leading-relaxed mb-12 uppercase">
          Подбираем, покупаем и продаём недвижимость. Наши услуги для вас бесплатны.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#contacts"
            className="inline-flex items-center justify-center px-8 py-4 bg-cream text-burgundy text-xs font-bold tracking-[0.2em] hover:bg-cream-dark transition-colors"
          >
            ПОДОБРАТЬ КВАРТИРУ
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center px-8 py-4 border border-cream text-cream text-xs font-bold tracking-[0.2em] hover:bg-cream hover:text-burgundy transition-all"
          >
            УЗНАТЬ БОЛЬШЕ
          </a>
        </div>
      </div>

      <div className="border-t border-burgundy-medium px-10 lg:px-16 py-8 grid grid-cols-3 gap-4">
        {stats.map(stat => (
          <div key={stat.label}>
            <div className="font-serif text-cream text-3xl lg:text-4xl font-semibold mb-1">
              {stat.value}
            </div>
            <div className="text-cream-dark text-[10px] tracking-[0.2em]">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
