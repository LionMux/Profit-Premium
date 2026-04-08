const team = [
  { name: 'АЛЕКСАНДР ИВАНОВ', role: 'ГЕНЕРАЛЬНЫЙ ДИРЕКТОР', deals: '200+ СДЕЛОК', initials: 'АИ' },
  { name: 'МАРИЯ СОКОЛОВА', role: 'СТАРШИЙ ЭКСПЕРТ', deals: '150+ СДЕЛОК', initials: 'МС' },
  { name: 'ДМИТРИЙ ПЕТРОВ', role: 'ЭКСПЕРТ ПО ИПОТЕКЕ', deals: '300+ ОДОБРЕНИЙ', initials: 'ДП' },
  { name: 'ЕЛЕНА НОВИКОВА', role: 'ЭКСПЕРТ ПО ВТОРИЧКЕ', deals: '120+ СДЕЛОК', initials: 'ЕН' },
];

export default function TeamSection() {
  return (
    <section id="team" className="bg-cream-light py-24 px-10 lg:px-16">
      <div className="mb-16">
        <p className="text-burgundy-light text-[10px] tracking-[0.3em] mb-4">НАША КОМАНДА</p>
        <h2 className="font-serif text-burgundy text-4xl lg:text-5xl font-semibold uppercase leading-tight">
          Эксперты
          <br />с опытом
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream-dark">
        {team.map(member => (
          <div
            key={member.name}
            className="bg-cream-light p-8 group hover:bg-burgundy transition-colors duration-300"
          >
            <div className="w-16 h-16 bg-burgundy group-hover:bg-cream flex items-center justify-center mb-6 transition-colors">
              <span className="font-serif text-cream group-hover:text-burgundy text-lg font-semibold transition-colors">
                {member.initials}
              </span>
            </div>
            <h3 className="text-burgundy text-xs font-bold tracking-[0.15em] mb-2 group-hover:text-cream transition-colors">
              {member.name}
            </h3>
            <p className="text-burgundy-light text-[10px] tracking-[0.15em] mb-4 group-hover:text-cream-dark transition-colors">
              {member.role}
            </p>
            <div className="text-[10px] tracking-[0.2em] text-cream-dark bg-burgundy px-3 py-1 inline-block group-hover:bg-cream group-hover:text-burgundy transition-colors">
              {member.deals}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
