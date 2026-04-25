'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollLineProps {
  itemCount: number;
  className?: string;
}

const PATH_LENGTH = 100;

export default function ScrollLine({ itemCount, className = '' }: ScrollLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 639px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setProgress(1);
      return;
    }

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setProgress(entry.intersectionRatio);
      },
      { threshold: thresholds }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dots = Array.from({ length: itemCount }, (_, i) => i);

  if (isMobile) {
    return (
      <div ref={containerRef} className={`sm:hidden ${className}`}>
        <svg viewBox="0 0 100 20" className="w-full h-5" preserveAspectRatio="none">
          <path
            d="M 0 10 L 100 10"
            fill="none"
            stroke="#9B4458"
            strokeWidth="0.5"
            strokeDasharray={PATH_LENGTH}
            strokeDashoffset={PATH_LENGTH * (1 - progress)}
            style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
          />
          {dots.map((i) => {
            const x = itemCount > 1 ? (i / (itemCount - 1)) * 100 : 50;
            const dotProgress = (i + 1) / itemCount;
            const isActive = progress >= dotProgress - 0.15;
            return (
              <circle
                key={i}
                cx={x}
                cy="10"
                r="3"
                fill="#3D1220"
                opacity={isActive ? 1 : 0.2}
                style={{ transition: 'opacity 0.3s ease' }}
              />
            );
          })}
        </svg>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`hidden sm:block ${className}`}>
      <svg viewBox="0 0 20 100" className="h-full w-5" preserveAspectRatio="none">
        <path
          d="M 10 0 L 10 100"
          fill="none"
          stroke="#9B4458"
          strokeWidth="0.5"
          strokeDasharray={PATH_LENGTH}
          strokeDashoffset={PATH_LENGTH * (1 - progress)}
          style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
        />
        {dots.map((i) => {
          const y = itemCount > 1 ? (i / (itemCount - 1)) * 100 : 50;
          const dotProgress = (i + 1) / itemCount;
          const isActive = progress >= dotProgress - 0.15;
          return (
            <circle
              key={i}
              cx="10"
              cy={y}
              r="3"
              fill="#3D1220"
              opacity={isActive ? 1 : 0.2}
              style={{ transition: 'opacity 0.3s ease' }}
            />
          );
        })}
      </svg>
    </div>
  );
}
