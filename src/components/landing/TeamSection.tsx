const team = [
  {
    name: 'Александр Иванов',
    role: 'Генеральный директор',
    deals: '200+ сделок',
    initials: 'АИ',
  },
  {
    name: 'Мария Соколова',
    role: 'Старший эксперт',
    deals: '150+ сделок',
    initials: 'МС',
  },
  {
    name: 'Дмитрий Петров',
    role: 'Эксперт по ипотеке',
    deals: '300+ одобрений',
    initials: 'ДП',
  },
  {
    name: 'Елена Новикова',
    role: 'Эксперт по вторичке',
    deals: '120+ сделок',
    initials: 'ЕН',
  },
];

const avatarColors = [
  'from-amber-400 to-amber-600',
  'from-slate-600 to-slate-800',
  'from-amber-500 to-orange-600',
  'from-slate-500 to-slate-700',
];

export default function TeamSection() {
  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-amber-500 text-sm font-semibold tracking-widest uppercase">
            Наша команда
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            Эксперты с опытом и знаниями
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Каждый специалист прошёл обучение и подтвердил экспертизу сотнями успешных сделок
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={member.name}
              className="group text-center p-6 rounded-2xl border border-slate-100 hover:border-amber-200 hover:shadow-lg transition-all"
            >
              <div
                className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${avatarColors[index]} flex items-center justify-center text-white text-xl font-bold mb-4 group-hover:scale-105 transition-transform`}
              >
                {member.initials}
              </div>
              <h3 className="font-semibold text-slate-900">{member.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{member.role}</p>
              <span className="inline-block mt-3 px-3 py-1 bg-amber-50 text-amber-600 text-xs font-medium rounded-full">
                {member.deals}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
