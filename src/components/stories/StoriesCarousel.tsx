'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Story {
  id: string;
  imageUrl: string;
  title: string;
  link?: string | null;
}

interface StoriesCarouselProps {
  stories: Story[];
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

export function StoriesCarousel({
  stories,
  className,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
}: StoriesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const cardWidth = 224; // 56 * 4 (lg:w-56)
  const gap = 24; // gap-6

  const scrollToIndex = useCallback((index: number) => {
    if (scrollRef.current) {
      const newScrollLeft = index * (cardWidth + gap);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  }, []);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const newIndex = direction === 'left'
      ? Math.max(0, currentIndex - 1)
      : Math.min(stories.length - 1, currentIndex + 1);
    scrollToIndex(newIndex);
  }, [currentIndex, stories.length, scrollToIndex]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || stories.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % stories.length;
      scrollToIndex(nextIndex);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, currentIndex, stories.length, scrollToIndex]);

  // Update current index on scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const newIndex = Math.round(container.scrollLeft / (cardWidth + gap));
      setCurrentIndex(Math.min(newIndex, stories.length - 1));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [stories.length]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  if (stories.length === 0) {
    return (
      <div className={cn('text-center py-16', className)}>
        <p className="text-cream/60 text-lg">Новости и акции появятся здесь позже</p>
      </div>
    );
  }

  return (
    <div className={cn('relative group', className)}>
      {/* Navigation Arrows */}
      {showArrows && stories.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full',
              'bg-cream/20 hover:bg-cream/30 text-cream backdrop-blur-sm',
              'transition-all duration-300 hidden lg:flex',
              currentIndex === 0 && 'opacity-0 pointer-events-none'
            )}
            onClick={() => scroll('left')}
            aria-label="Прокрутить влево"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full',
              'bg-cream/20 hover:bg-cream/30 text-cream backdrop-blur-sm',
              'transition-all duration-300 hidden lg:flex',
              currentIndex === stories.length - 1 && 'opacity-0 pointer-events-none'
            )}
            onClick={() => scroll('right')}
            aria-label="Прокрутить вправо"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Stories Container */}
      <div
        ref={scrollRef}
        className={cn(
          'flex gap-4 lg:gap-6 overflow-x-auto pb-4',
          'scrollbar-hide scroll-snap-x mandatory',
          isDragging && 'cursor-grabbing'
        )}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {stories.map((story, index) => (
          <StoryCard
            key={story.id}
            story={story}
            isActive={index === currentIndex}
          />
        ))}
      </div>

      {/* Dots Pagination */}
      {showDots && stories.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'w-8 bg-cream'
                  : 'w-2 bg-cream/40 hover:bg-cream/60'
              )}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function StoryCard({
  story,
  isActive,
}: {
  story: Story;
  isActive: boolean;
}) {
  const content = (
    <div
      className={cn(
        'flex-shrink-0 w-48 h-64 lg:w-56 lg:h-80 rounded-2xl overflow-hidden relative group cursor-pointer',
        'scroll-snap-align-start transition-all duration-500',
        isActive ? 'scale-100' : 'scale-95 opacity-80'
      )}
    >
      {/* Image */}
      <Image
        src={story.imageUrl}
        alt={story.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 192px, 224px"
        draggable={false}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
        <h3 className="text-white font-medium text-sm lg:text-base line-clamp-3 leading-snug">
          {story.title}
        </h3>
      </div>

      {/* Hover Ring */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-white/0 group-hover:ring-white/30 transition-all duration-300" />

      {/* Active Indicator */}
      {isActive && (
        <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-cream animate-pulse" />
      )}
    </div>
  );

  if (story.link) {
    return (
      <a
        href={story.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}
