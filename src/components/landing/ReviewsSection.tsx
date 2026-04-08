const reviews = [
  {
    name: 'АННА КОЗЛОВА',
    date: 'ФЕВРАЛЬ 2026',
    text: 'Обратились за помощью в подборе квартиры и остались очень довольны. Всё объяснили, показали несколько вариантов, помогли с ипотекой. Никакого давления — только реальная помощь.',
  },
  {
    name: 'ИГОРЬ МАКАРОВ',
    date: 'ЯНВАРЬ 2026',
    text: 'Продавал квартиру через агентство. Нашли покупателя за 3 недели, оценили правильно и провели сделку чисто. Сэкономил кучу нервов и времени.',
  },
  {
    name: 'СВЕТЛАНА БОРИСОВА',
    date: 'ДЕКАБРЬ 2025',
    text: 'Первая квартира — это всегда страшно. Мне всё рассказали, провели по всем этапам, подобрали ипотеку с хорошей ставкой. Буду рекомендовать друзьям.',
  },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="bg-burgundy-dark py-24 px-10 lg:px-16">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
        <div>
          <p className="text-cream-dark text-[10px] tracking-[0.3em] mb-4">ОТЗЫВЫ</p>
          <h2 className="font-serif text-cream text-4xl lg:text-5xl font-semibold uppercase leading-tight">
            Что говорят
            <br />
            клиенты
          </h2>
        </div>
        <div className="text-right">
          <div className="font-serif text-cream text-4xl font-semibold">500+</div>
          <div className="text-cream-dark text-[10px] tracking-[0.2em]">БЛАГОДАРНЫХ ОТЗЫВОВ</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-burgundy-medium">
        {reviews.map(review => (
          <div key={review.name} className="bg-burgundy-dark p-8 lg:p-10">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-cream" />
              ))}
            </div>
            <p className="text-cream-dark text-sm leading-relaxed mb-8 italic font-serif">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="border-t border-burgundy-medium pt-5 flex items-end justify-between">
              <div>
                <div className="text-cream text-[10px] font-bold tracking-[0.2em]">
                  {review.name}
                </div>
                <div className="text-cream-dark text-[10px] tracking-widest mt-1">
                  КЛИЕНТ АГЕНТСТВА
                </div>
              </div>
              <div className="text-cream-dark text-[10px] tracking-widest">{review.date}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
