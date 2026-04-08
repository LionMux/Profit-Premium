const services = [
  {
    title: 'ПОКУПКА НОВОСТРОЙКИ',
    description:
      'Подбираем квартиру в новостройке под ваши критерии и бюджет. Сравниваем объекты, организуем показы.',
    features: ['ПОДБОР ПО ПАРАМЕТРАМ', 'СРАВНЕНИЕ ОБЪЕКТОВ', 'ЮРИДИЧЕСКОЕ СОПРОВОЖДЕНИЕ'],
  },
  {
    title: 'ИПОТЕКА И РАССРОЧКА',
    description: 'Подбираем выгодные ипотечные программы и рассрочки. Дистанционно подаём заявки.',
    features: ['СТАВКИ ОТ 0,1%', 'БЕЗ ЛИШНИХ ДОКУМЕНТОВ', 'ДИСТАНЦИОННОЕ ОФОРМЛЕНИЕ'],
  },
  {
    title: 'ПРОДАЖА ВТОРИЧКИ',
    description:
      'Оцениваем вашу квартиру, находим покупателей и проводим сделку с юридической проверкой.',
    features: ['ОЦЕНКА ЗА 1 ДЕНЬ', 'РЕКЛАМА НА 50+ ПЛОЩАДКАХ', 'ЮРИСТ НА СДЕЛКЕ'],
  },
  {
    title: 'TRADE-IN',
    description:
      'Обмениваем вашу старую квартиру на новую. Сначала подбираем вариант, затем продаём текущую.',
    features: ['ФИКСАЦИЯ ЦЕНЫ НОВОЙ', 'ПРОДАЖА В СРОК', 'БЕЗ ДВОЙНЫХ ПЕРЕЕЗДОВ'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-burgundy py-24 px-10 lg:px-16">
      <div className="mb-16">
        <p className="text-cream-dark text-[10px] tracking-[0.3em] mb-4">ЧТО МЫ ДЕЛАЕМ</p>
        <h2 className="font-serif text-cream text-4xl lg:text-5xl font-semibold uppercase leading-tight">
          Полный цикл
          <br />
          работы
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-burgundy-medium">
        {services.map(service => (
          <div
            key={service.title}
            className="bg-burgundy p-8 lg:p-10 group hover:bg-burgundy-medium transition-colors duration-300"
          >
            <h3 className="text-cream text-xs font-bold tracking-[0.2em] mb-4">{service.title}</h3>
            <p className="text-cream-dark text-sm leading-relaxed mb-6">{service.description}</p>
            <ul className="space-y-2 border-t border-burgundy-medium pt-5">
              {service.features.map(f => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-[10px] tracking-[0.15em] text-cream-dark"
                >
                  <span className="w-4 h-px bg-cream-dark flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
