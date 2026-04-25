'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SlotCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

type Token =
  | { type: 'digit'; char: string }
  | { type: 'static'; text: string };

function tokenize(value: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < value.length) {
    if (/\d/.test(value[i])) {
      tokens.push({ type: 'digit', char: value[i] });
      i++;
    } else {
      let text = '';
      while (i < value.length && !/\d/.test(value[i])) {
        text += value[i];
        i++;
      }
      tokens.push({ type: 'static', text });
    }
  }

  return tokens;
}

function DigitReveal({
  digit,
  delay,
  duration,
  visible,
}: {
  digit: string;
  delay: number;
  duration: number;
  visible: boolean;
}) {
  return (
    <span
      className="inline-flex min-w-[0.65ch] items-baseline justify-center tabular-nums"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(0.38em)',
        transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      {digit}
    </span>
  );
}

export default function SlotCounter({
  value,
  duration = 900,
  className,
}: SlotCounterProps) {
  const tokens = useMemo(() => tokenize(value), [value]);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setVisible(true);
      playedRef.current = true;
      return;
    }

    const el = ref.current;
    if (!el) return;

    setVisible(false);
    playedRef.current = false;

    // Immediate start: check if element is already visible on mount
    const rect = el.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInViewport) {
      playedRef.current = true;
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.65 && !playedRef.current) {
          playedRef.current = true;
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: [0, 0.35, 0.65, 1],
        rootMargin: '0px 0px -12% 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [value]);

  const revealDuration = Math.max(420, duration);

  return (
    <span
      ref={ref}
      className={cn('inline-flex items-baseline whitespace-nowrap tabular-nums', className)}
      aria-label={value}
    >
      {tokens.map((token, i) =>
        token.type === 'digit' ? (
          <DigitReveal
            key={`${i}-${token.char}`}
            digit={token.char}
            delay={i * 55}
            duration={revealDuration}
            visible={visible}
          />
        ) : (
          <span key={`${i}-${token.text}`} className="whitespace-pre">
            {token.text}
          </span>
        )
      )}
    </span>
  );
}
