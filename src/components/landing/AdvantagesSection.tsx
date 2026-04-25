const advantages = [
  {
    number: '01',
    title: 'РАБОТАЕМ БЕСПЛАТНО',
    description:
      'Наши услуги оплачивает застройщик. Для вас подбор, показы и сопровождение сделки — 0 ₽.',
  },
  {
    number: '02',
    title: 'ПРОВЕРЕННЫЕ ЗАСТРОЙЩИКИ',
    description:
      'Работаем только с надёжными партнёрами. Проверяем все документы и разрешения на строительство.',
  },
  {
    number: '03',
    title: 'СКИДКИ ДО 1 000 000 ₽',
    description:
      'Благодаря партнёрству с застройщиками наши клиенты получают эксклюзивные условия.',
  },
  {
    number: '04',
    title: 'ЛИЧНЫЙ ЭКСПЕРТ',
    description: 'Персональный специалист ведёт вас от первой консультации до получения ключей.',
  },
];

import SplitText from '@/components/effects/SplitText';
import ScrollLine from '@/components/effects/ScrollLine';

export default function AdvantagesSection() {
  return (
    <section id="about" className="bg-cream py-24 px-10 lg:px-16">
      <div className="mb-16">
        <p className="text-burgundy-light text-[10px] tracking-[0.3em] mb-4">ПОЧЕМУ ВЫБИРАЮТ НАС</p>
        <h2 className="font-serif text-burgundy text-4xl lg:text-5xl font-semibold uppercase leading-tight">
          <SplitText text="С заботой" as="span" className="font-serif text-burgundy text-4xl lg:text-5xl font-semibold uppercase leading-tight" />
          <br />
          <SplitText text="о каждом клиенте" as="span" className="font-serif text-burgundy text-4xl lg:text-5xl font-semibold uppercase leading-tight" />
        </h2>
      </div>

      <div className="relative">
        <ScrollLine itemCount={4} className="mb-6 sm:mb-0 sm:absolute sm:-left-8 sm:top-0 sm:bottom-0 sm:w-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-cream-dark">
          {advantages.map(item => (
            <div
              key={item.number}
              className="bg-cream p-8 lg:p-10 group hover:bg-burgundy transition-colors duration-300"
            >
              <div className="font-serif text-cream-dark text-5xl font-semibold mb-6 group-hover:text-burgundy-medium transition-colors">
                {item.number}
              </div>
              <h3 className="text-burgundy text-xs font-bold tracking-[0.2em] mb-4 group-hover:text-cream transition-colors">
                {item.title}
              </h3>
              <p className="text-burgundy-light text-sm leading-relaxed group-hover:text-cream-dark transition-colors">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
