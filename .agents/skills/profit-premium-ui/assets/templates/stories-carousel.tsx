/**
 * Stories Carousel Template (Samokat-style)
 * Use for: Homepage stories block
 * Location: src/components/stories/StoriesCarousel.tsx
 * 
 * Features:
 * - Horizontal snap scrolling
 * - Touch swipe support
 * - Navigation arrows (desktop)
 * - Gradient overlay with title
 * - Responsive sizing
 */

'use client';

import { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Story {
  id: string;
  imageUrl: string;
  title: string;
  link?: string;
}

interface StoriesCarouselProps {
  stories: Story[];
  className?: string;
}

export function StoriesCarousel({ stories, className }: StoriesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  }, []);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = direction === 'left' ? -240 : 240;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, []);

  if (stories.length === 0) {
    return (
      <div className={cn('p-8 border-2 border-dashed rounded-lg text-center', className)}>
        <p className="text-muted-foreground">Нет доступных сторис</p>
      </div>
    );
  }

  return (
    <div className={cn('relative group', className)}>
      {/* Navigation Arrows (Desktop) */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 
                     bg-white/90 hover:bg-white rounded-full p-2 shadow-lg
                     transition-all opacity-0 group-hover:opacity-100
                     hidden md:flex items-center justify-center"
          aria-label="Прокрутить влево"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 
                     bg-white/90 hover:bg-white rounded-full p-2 shadow-lg
                     transition-all opacity-0 group-hover:opacity-100
                     hidden md:flex items-center justify-center"
          aria-label="Прокрутить вправо"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={checkScrollability}
        className="flex gap-4 overflow-x-auto pb-4
                   scroll-snap-type-x-mandatory
                   scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}

function StoryCard({ story }: { story: Story }) {
  const CardWrapper = story.link ? Link : 'div';
  const cardProps = story.link ? { href: story.link } : {};

  return (
    <CardWrapper
      {...cardProps}
      className="flex-shrink-0 w-48 md:w-56 aspect-[3/4] rounded-xl overflow-hidden relative 
                 group/card cursor-pointer scroll-snap-align-start"
    >
      {/* Background Image */}
      <Image
        src={story.imageUrl}
        alt={story.title}
        fill
        className="object-cover transition-transform duration-300 group-hover/card:scale-105"
        sizes="(max-width: 768px) 192px, 224px"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-medium text-sm line-clamp-2">
          {story.title}
        </h3>
      </div>
    </CardWrapper>
  );
}
