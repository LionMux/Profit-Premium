const team = [
  { name: 'Александр Иванов', role: 'Генеральный директор', deals: '200+ сделок', experience: '15 лет' },
  { name: 'Мария Соколова', role: 'Старший эксперт', deals: '150+ сделок', experience: '12 лет' },
  { name: 'Дмитрий Петров', role: 'Эксперт по ипотеке', deals: '300+ одобрений', experience: '10 лет' },
  { name: 'Елена Новикова', role: 'Эксперт по вторичке', deals: '120+ сделок', experience: '8 лет' },
];

import SplitText from '@/components/effects/SplitText';
import TiltCard from '@/components/effects/TiltCard';

export default function TeamSection() {
  return (
    <section id="team" className="bg-cream-light py-24 px-10 lg:px-16">
      <div className="mb-16">
        <p className="text-burgundy-light text-[10px] tracking-[0.3em] mb-4">НАША КОМАНДА</p>
        <h2 className="font-serif text-burgundy text-4xl lg:text-5xl font-semibold uppercase leading-tight">
          <SplitText text="Эксперты" as="span" className="font-serif text-burgundy text-4xl lg:text-5xl font-semibold uppercase leading-tight" />
          <br />
          <SplitText text="с опытом" as="span" className="font-serif text-burgundy text-4xl lg:text-5xl font-semibold uppercase leading-tight" />
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member) => (
          <TiltCard key={member.name} className="h-full">
            <div className="group h-full bg-[#f6efe4] border border-burgundy/12 shadow-[0_12px_32px_rgba(61,18,32,0.06)] p-8 flex flex-col transition-shadow duration-300 group-hover:shadow-[0_18px_42px_rgba(61,18,32,0.1)]">
              {/* Top accent line */}
              <div className="w-10 h-px bg-burgundy/45 mb-8 group-hover:w-16 group-hover:bg-burgundy/70 transition-all duration-500" />

              {/* Name */}
              <h3 className="font-serif text-burgundy text-xl font-medium leading-snug mb-1">
                {member.name}
              </h3>

              {/* Role */}
              <p className="text-burgundy-light text-sm mb-10">
                {member.role}
              </p>

              {/* Spacer */}
              <div className="flex-1 min-h-[40px]" />

              {/* Stats */}
              <div className="space-y-3 pt-6 border-t border-burgundy/10">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] tracking-[0.2em] text-burgundy-light/70 uppercase">
                    Опыт
                  </span>
                  <span className="text-sm text-burgundy font-medium drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]">
                    {member.experience}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] tracking-[0.2em] text-burgundy-light/70 uppercase">
                    {member.deals.includes('одобрений') ? 'Одобрений' : 'Сделок'}
                  </span>
                  <span className="font-serif text-burgundy text-xl font-semibold drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]">
                    {member.deals.replace(/\D/g, '')}+
                  </span>
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
