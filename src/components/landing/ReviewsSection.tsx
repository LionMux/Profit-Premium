const reviews = [
  {
    name: 'Анна Козлова',
    date: 'Февраль 2026',
    text: 'Обратились за помощью в подборе квартиры и остались очень довольны. Всё объяснили, показали несколько вариантов, помогли с ипотекой. Никакого давления — только реальная помощь.',
    rating: 5,
  },
  {
    name: 'Игорь Макаров',
    date: 'Январь 2026',
    text: 'Продавал квартиру через агентство. Нашли покупателя за 3 недели, оценили правильно и провели сделку чисто. Сэкономил кучу нервов и времени.',
    rating: 5,
  },
  {
    name: 'Светлана Борисова',
    date: 'Декабрь 2025',
    text: 'Первая квартира — это всегда страшно. Мне всё рассказали, провели по всем этапам, подобрали ипотеку с хорошей ставкой. Буду рекомендовать друзьям.',
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">
              Отзывы
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
              Что говорят наши клиенты
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">500+</div>
              <div className="text-sm text-slate-400">благодарных отзывов</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div
              key={review.name}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-amber-400/30 transition-colors"
            >
              <StarRating count={review.rating} />
              <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white text-sm">{review.name}</div>
                  <div className="text-slate-500 text-xs mt-0.5">Клиент агентства</div>
                </div>
                <span className="text-slate-600 text-xs">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
