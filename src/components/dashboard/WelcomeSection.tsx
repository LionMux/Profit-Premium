'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface WelcomeSectionProps {
  userName: string;
  className?: string;
}

export function WelcomeSection({ userName, className }: WelcomeSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Доброе утро';
    if (hour < 18) return 'Добрый день';
    return 'Добрый вечер';
  };

  return (
    <section
      className={cn(
        'mb-12 transition-all duration-700 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      <p className="text-cream/60 text-xs tracking-[0.3em] mb-3 uppercase">
        {getGreeting()}
      </p>
      <h1 className="font-serif text-cream text-4xl lg:text-5xl font-semibold mb-4">
        {userName}
      </h1>
      <p className="text-cream/60 text-sm max-w-md leading-relaxed">
        Добро пожаловать в личный кабинет партнёра PROFIT PREMIUM.
        Здесь вы найдёте все материалы и инструменты для работы.
      </p>
    </section>
  );
}
