'use client';

import { useEffect, useRef } from 'react';

interface Blob {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  phaseX: number;
  phaseY: number;
  speedX: number;
  speedY: number;
  amplitudeX: number;
  amplitudeY: number;
}

interface PointerState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  alpha: number;
  targetAlpha: number;
}

const BURGUNDY_DARK = '61, 18, 32';
const BURGUNDY_MEDIUM = '122, 43, 62';
const CREAM = '240, 234, 224';

function createBlobs(width: number, height: number, isMobile: boolean): Blob[] {
  const count = isMobile ? 2 : 4;
  const radiusBase = isMobile ? 300 : 500;

  const configs = [
    {
      baseX: width * 0.2,
      baseY: height * 0.3,
      radius: radiusBase,
      color: BURGUNDY_DARK,
      phaseX: 0,
      phaseY: 1.5,
      speedX: 0.0003,
      speedY: 0.0004,
      amplitudeX: width * 0.15,
      amplitudeY: height * 0.2,
    },
    {
      baseX: width * 0.8,
      baseY: height * 0.4,
      radius: radiusBase * 1.1,
      color: BURGUNDY_MEDIUM,
      phaseX: 2.0,
      phaseY: 0.5,
      speedX: 0.00035,
      speedY: 0.00025,
      amplitudeX: width * 0.18,
      amplitudeY: height * 0.15,
    },
    {
      baseX: width * 0.5,
      baseY: height * 0.7,
      radius: radiusBase * 0.9,
      color: CREAM,
      phaseX: 1.0,
      phaseY: 3.0,
      speedX: 0.00025,
      speedY: 0.0003,
      amplitudeX: width * 0.12,
      amplitudeY: height * 0.18,
    },
    {
      baseX: width * 0.3,
      baseY: height * 0.6,
      radius: radiusBase * 1.05,
      color: BURGUNDY_DARK,
      phaseX: 4.0,
      phaseY: 2.5,
      speedX: 0.00028,
      speedY: 0.00038,
      amplitudeX: width * 0.14,
      amplitudeY: height * 0.16,
    },
  ];

  return configs.slice(0, count).map(cfg => ({
    x: cfg.baseX,
    y: cfg.baseY,
    baseX: cfg.baseX,
    baseY: cfg.baseY,
    radius: cfg.radius,
    color: cfg.color,
    phaseX: cfg.phaseX,
    phaseY: cfg.phaseY,
    speedX: cfg.speedX,
    speedY: cfg.speedY,
    amplitudeX: cfg.amplitudeX,
    amplitudeY: cfg.amplitudeY,
  }));
}

const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

export default function MeshGradient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobsRef = useRef<Blob[]>([]);
  const pointerRef = useRef<PointerState>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    alpha: 0,
    targetAlpha: 0,
  });
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);
  const supportsHoverRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mql.matches;
    supportsHoverRef.current = window.matchMedia('(hover: hover)').matches;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = width < 768;
      blobsRef.current = createBlobs(width, height, isMobile);
    };

    resize();

    const handleResize = () => {
      resize();
    };

    window.addEventListener('resize', handleResize);

    const handleMotionChange = (e: MediaQueryListEvent | MediaQueryList) => {
      reducedMotionRef.current = e.matches;
    };

    mql.addEventListener('change', handleMotionChange);

    startTimeRef.current = performance.now();

    const draw = (time: number) => {
      const elapsed = time - startTimeRef.current;

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#3D1220';
      ctx.fillRect(0, 0, width, height);

      if (!reducedMotionRef.current) {
        for (const blob of blobsRef.current) {
          blob.x =
            blob.baseX +
            Math.sin(elapsed * blob.speedX + blob.phaseX) * blob.amplitudeX;
          blob.y =
            blob.baseY +
            Math.sin(elapsed * blob.speedY + blob.phaseY) * blob.amplitudeY;
        }
      }

      for (const blob of blobsRef.current) {
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );
        const alpha = blob.color === CREAM ? 0.25 : 0.5;
        gradient.addColorStop(0, `rgba(${blob.color}, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(${blob.color}, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${blob.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      if (!reducedMotionRef.current && pointerRef.current.alpha > 0.01) {
        const pointer = pointerRef.current;

        pointer.x = lerp(pointer.x, pointer.targetX, 0.08);
        pointer.y = lerp(pointer.y, pointer.targetY, 0.08);
        pointer.alpha = lerp(pointer.alpha, pointer.targetAlpha, 0.05);

        const glowRadius = Math.max(220, Math.min(width, height) * 0.22);
        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        const glow = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          glowRadius
        );
        glow.addColorStop(0, `rgba(240, 234, 224, ${0.22 * pointer.alpha})`);
        glow.addColorStop(0.3, `rgba(240, 234, 224, ${0.12 * pointer.alpha})`);
        glow.addColorStop(0.55, `rgba(122, 43, 62, ${0.08 * pointer.alpha})`);
        glow.addColorStop(1, 'rgba(240, 234, 224, 0)');

        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      } else {
        pointerRef.current.alpha = lerp(pointerRef.current.alpha, pointerRef.current.targetAlpha, 0.05);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      mql.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const updatePointer = (clientX: number, clientY: number) => {
    if (!supportsHoverRef.current || reducedMotionRef.current) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    pointerRef.current.targetX = clientX - rect.left;
    pointerRef.current.targetY = clientY - rect.top;
    pointerRef.current.targetAlpha = 1;

    if (pointerRef.current.alpha === 0) {
      pointerRef.current.x = pointerRef.current.targetX;
      pointerRef.current.y = pointerRef.current.targetY;
      pointerRef.current.alpha = 1;
    }
  };

  const clearPointer = () => {
    pointerRef.current.targetAlpha = 0;
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
      onPointerMove={e => updatePointer(e.clientX, e.clientY)}
      onPointerEnter={e => updatePointer(e.clientX, e.clientY)}
      onPointerLeave={clearPointer}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
