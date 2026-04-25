import MeshGradient from '@/components/effects/MeshGradient';
import SlotCounter from '@/components/effects/SlotCounter';
import SplitText from '@/components/effects/SplitText';

const stats = [
  { value: '500+', label: 'УСПЕШНЫХ СДЕЛОК' },
  { value: '8 ЛЕТ', label: 'НА РЫНКЕ' },
  { value: '0 ₽', label: 'СТОИМОСТЬ УСЛУГ' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-burgundy pt-14 lg:pt-0 flex flex-col justify-between">
      <MeshGradient />
      <div className="relative z-10 flex-1 px-10 py-20 lg:px-16 lg:py-16">
        <div className="grid items-center gap-8">
          <div className="max-w-3xl">
            <p className="mb-6 text-xs tracking-[0.3em] text-cream-dark">АГЕНТСТВО НЕДВИЖИМОСТИ</p>

            <h1 className="mb-8 font-serif text-5xl font-semibold leading-none tracking-wide text-cream uppercase sm:text-6xl lg:text-7xl">
              <SplitText
                text="Найдём"
                as="span"
                className="font-serif text-5xl font-semibold leading-none tracking-wide text-cream uppercase sm:text-6xl lg:text-7xl"
              />
              <br />
              <SplitText
                text="вашу"
                as="span"
                className="font-serif text-5xl font-semibold leading-none tracking-wide text-cream uppercase sm:text-6xl lg:text-7xl"
              />
              <br />
              <SplitText
                text="квартиру"
                as="span"
                className="font-serif text-5xl font-semibold leading-none tracking-wide text-cream uppercase sm:text-6xl lg:text-7xl"
              />
            </h1>

            <p className="mb-12 max-w-sm text-sm leading-relaxed tracking-widest text-cream-dark uppercase">
              Подбираем, покупаем и продаём недвижимость. Наши услуги для вас бесплатны.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#contacts"
                className="inline-flex items-center justify-center bg-cream px-8 py-4 text-xs font-bold tracking-[0.2em] text-burgundy transition-colors hover:bg-cream-dark"
              >
                ПОДОБРАТЬ КВАРТИРУ
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center border border-cream px-8 py-4 text-xs font-bold tracking-[0.2em] text-cream transition-all hover:bg-cream hover:text-burgundy"
              >
                УЗНАТЬ БОЛЬШЕ
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-4 border-t border-burgundy-medium px-10 py-8 lg:px-16">
        {stats.map((stat) => (
          <div key={stat.label}>
            <SlotCounter value={stat.value} className="mb-1 font-serif text-3xl font-semibold text-cream lg:text-4xl" />
            <div className="text-[10px] tracking-[0.2em] text-cream-dark">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
