'use client';

import { ReactNode, useCallback, useEffect, useRef } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

const MAX_TILT = 4.5;
const PERSPECTIVE = 1100;
const SCALE = 1.012;
const SPEED = 280;

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isHoveringRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const setPointerVars = useCallback((x: number, y: number) => {
    const element = cardRef.current;
    if (!element) return;

    element.style.setProperty('--shine-x', `${x}px`);
    element.style.setProperty('--shine-y', `${y}px`);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const element = cardRef.current;
    if (!element || !isHoveringRef.current || reducedMotionRef.current) return;

    cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const rotateX = -percentY * MAX_TILT;
      const rotateY = percentX * MAX_TILT;

      const shadowX = -percentX * 10;
      const shadowY = -percentY * 10;

      setPointerVars(x, y);

      element.style.transform = `
        perspective(${PERSPECTIVE}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(${SCALE}, ${SCALE}, ${SCALE})
      `;
      element.style.boxShadow = `${shadowX}px ${shadowY}px 28px rgba(61, 18, 32, 0.09)`;
    });
  }, [setPointerVars]);

  const handleMouseEnter = useCallback(() => {
    const element = cardRef.current;
    if (!element || reducedMotionRef.current) return;

    isHoveringRef.current = true;
    element.style.transition = 'none';
    element.style.setProperty('--shine-opacity', '1');
  }, []);

  const handleMouseLeave = useCallback(() => {
    const element = cardRef.current;
    if (!element || reducedMotionRef.current) return;

    isHoveringRef.current = false;
    cancelAnimationFrame(rafRef.current);

    element.style.transition = `transform ${SPEED}ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow ${SPEED}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    element.style.transform = `perspective(${PERSPECTIVE}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    element.style.boxShadow = '0 10px 28px rgba(61, 18, 32, 0.08)';
    element.style.setProperty('--shine-opacity', '0');

    setTimeout(() => {
      if (!isHoveringRef.current && element) {
        element.style.transition = '';
      }
    }, SPEED);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mql.matches;

    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mql.addEventListener('change', handler);

    const card = cardRef.current;
    if (card && !reducedMotionRef.current) {
      const supportsHover = window.matchMedia('(hover: hover)').matches;
      if (supportsHover) {
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mousemove', handleMouseMove);
      }
    }

    return () => {
      mql.removeEventListener('change', handler);
      if (card) {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
        card.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseEnter, handleMouseLeave, handleMouseMove]);

  return (
    <>
      <div
        ref={cardRef}
        className={`relative hidden sm:block ${className}`}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform, box-shadow',
          boxShadow: '0 10px 28px rgba(61, 18, 32, 0.08)',
          borderRadius: '0px',
          isolation: 'isolate',
          '--shine-x': '50%',
          '--shine-y': '50%',
          '--shine-opacity': '0',
        } as React.CSSProperties}
      >
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            opacity: 'var(--shine-opacity)',
            background:
              'radial-gradient(circle 240px at var(--shine-x) var(--shine-y), rgba(240, 234, 224, 0.26), rgba(240, 234, 224, 0.1) 22%, transparent 58%)',
            mixBlendMode: 'screen',
            filter: 'blur(1px)',
          }}
        />
        <div className="relative z-10 h-full">{children}</div>
      </div>

      <div className={`sm:hidden ${className}`}>{children}</div>
    </>
  );
}
