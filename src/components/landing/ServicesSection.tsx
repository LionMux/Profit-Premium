const services = [
  {
    number: '01',
    title: 'Покупка новостройки',
    description:
      'Подбираем квартиру в новостройке под ваши критерии и бюджет. Сравниваем объекты, организуем показы и сопровождаем на сделке.',
    features: ['Подбор по параметрам', 'Сравнение объектов', 'Юридическое сопровождение'],
  },
  {
    number: '02',
    title: 'Ипотека и рассрочка',
    description:
      'Подбираем выгодные ипотечные программы и рассрочки. Дистанционно подаём заявки и помогаем получить одобрение.',
    features: ['Ставки от 0,1%', 'Без лишних документов', 'Дистанционное оформление'],
  },
  {
    number: '03',
    title: 'Продажа вторички',
    description:
      'Оцениваем вашу квартиру, находим покупателей и проводим сделку безопасно — с юридической проверкой.',
    features: ['Оценка за 1 день', 'Реклама на 50+ площадках', 'Юрист на сделке'],
  },
  {
    number: '04',
    title: 'Trade-in',
    description:
      'Обмениваем вашу старую квартиру на новую. Сначала подбираем вариант, затем продаём текущую — без рисков.',
    features: ['Фиксация цены новой', 'Продажа в срок', 'Без двойных переездов'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <span className="text-amber-500 text-sm font-semibold tracking-widest uppercase">
              Что мы делаем
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
              Полный цикл работы <br className="hidden sm:block" />
              с недвижимостью
            </h2>
          </div>
          <p className="text-slate-500 max-w-md">
            От первого звонка до получения ключей — берём на себя всю работу, чтобы вы занимались своими делами.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.number}
              className="group bg-white rounded-2xl p-8 border border-slate-100 hover:border-amber-200 hover:shadow-xl hover:shadow-slate-100 transition-all"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-5xl font-bold text-slate-100 group-hover:text-amber-100 transition-colors select-none">
                  {service.number}
                </span>
                <svg className="w-5 h-5 text-slate-300 group-hover:text-amber-400 transition-colors mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
