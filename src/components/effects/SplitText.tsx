'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div' | 'p';
  stagger?: number;
  duration?: number;
  yOffset?: number;
}

export default function SplitText({
  text,
  className = '',
  as: Tag = 'span',
  stagger = 0.03,
  duration = 0.5,
  yOffset = 40,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const chars = useMemo(() => text.split(''), [text]);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReducedMotion = () => setReducedMotion(mql.matches);

    updateReducedMotion();

    if (mql.matches) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(el);
    mql.addEventListener('change', updateReducedMotion);

    return () => {
      observer.disconnect();
      mql.removeEventListener('change', updateReducedMotion);
    };
  }, [text]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLHeadingElement & HTMLSpanElement & HTMLDivElement & HTMLParagraphElement>}
      className={`inline-block ${className}`}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="inline-block"
          style={{
            opacity: isVisible || reducedMotion ? 1 : 0,
            transform:
              isVisible || reducedMotion
                ? 'translateY(0)'
                : `translateY(${yOffset}px)`,
            transition: reducedMotion
              ? 'none'
              : `opacity ${duration}s ease ${i * stagger}s, transform ${duration}s ease ${i * stagger}s`,
            whiteSpace: char === ' ' ? 'pre' : undefined,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  );
}
