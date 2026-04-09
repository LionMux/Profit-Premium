'use client';

import { useRef } from 'react';
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
}

export function StoriesCarousel({ stories, className }: StoriesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
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
      {/* Navigation Arrows - Desktop Only */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hidden lg:flex"
        onClick={() => scroll('left')}
        aria-label="Прокрутить влево"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hidden lg:flex"
        onClick={() => scroll('right')}
        aria-label="Прокрутить вправо"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Stories Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide scroll-snap-x mandatory pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}

function StoryCard({ story }: { story: Story }) {
  const content = (
    <div className="flex-shrink-0 w-48 h-64 lg:w-56 lg:h-80 rounded-2xl overflow-hidden relative group cursor-pointer scroll-snap-align-start">
      {/* Image */}
      <Image
        src={story.imageUrl}
        alt={story.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 192px, 224px"
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
    </div>
  );

  if (story.link) {
    return (
      <a href={story.link} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}
