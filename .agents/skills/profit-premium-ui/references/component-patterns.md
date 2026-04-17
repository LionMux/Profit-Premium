# Component Patterns

Reusable UI patterns for Profit-Premium.

## Stories Carousel

Horizontal scrolling cards with snap points.

```tsx
// StoriesCarousel.tsx
'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Story {
  id: string;
  imageUrl: string;
  title: string;
  link?: string;
}

interface StoriesCarouselProps {
  stories: Story[];
}

export function StoriesCarousel({ stories }: StoriesCarouselProps) {
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

  return (
    <div className="relative">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {stories.map(story => (
          <a key={story.id} href={story.link || '#'} className="flex-shrink-0 w-64 snap-start">
            <div className="bg-cream rounded-lg overflow-hidden aspect-[4/5] relative group">
              <img
                src={story.imageUrl}
                alt={story.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif text-lg text-cream font-semibold">{story.title}</h3>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-cream rounded-full shadow-lg flex items-center justify-center hover:bg-cream-dark transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-burgundy-dark" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-cream rounded-full shadow-lg flex items-center justify-center hover:bg-cream-dark transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-burgundy-dark" />
      </button>
    </div>
  );
}
```

## Material Card

Card for displaying PDF materials.

```tsx
// MaterialCard.tsx
import { FileText, Download } from 'lucide-react';

interface Material {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  thumbnailUrl?: string;
  city: string;
  propertyType: string;
}

interface MaterialCardProps {
  material: Material;
}

export function MaterialCard({ material }: MaterialCardProps) {
  return (
    <div className="bg-cream rounded-lg overflow-hidden group">
      {/* Thumbnail */}
      <div className="aspect-video relative bg-burgundy-dark">
        {material.thumbnailUrl ? (
          <img
            src={material.thumbnailUrl}
            alt={material.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText className="w-16 h-16 text-cream/30" />
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-burgundy-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <a
            href={material.fileUrl}
            download
            className="bg-cream text-burgundy-dark px-4 py-2 rounded flex items-center gap-2 hover:bg-cream-dark transition-colors"
          >
            <Download className="w-4 h-4" />
            Скачать PDF
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-burgundy bg-burgundy/10 px-2 py-1 rounded">
            {material.city}
          </span>
          <span className="text-xs text-burgundy/60">{material.propertyType}</span>
        </div>
        <h3 className="font-serif text-lg text-burgundy-dark font-semibold mb-1">
          {material.title}
        </h3>
        {material.description && (
          <p className="text-sm text-burgundy-dark/60 line-clamp-2">{material.description}</p>
        )}
      </div>
    </div>
  );
}
```

## Action Card

Card with icon, title, and action button.

```tsx
// ActionCard.tsx
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  href?: string;
  onClick?: () => void;
}

export function ActionCard({
  icon: Icon,
  title,
  description,
  actionLabel,
  href,
  onClick,
}: ActionCardProps) {
  const content = (
    <div className="bg-cream rounded-lg p-6 h-full flex flex-col">
      <div className="w-12 h-12 bg-burgundy rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-cream" />
      </div>
      <h3 className="font-serif text-xl text-burgundy-dark font-semibold mb-2">{title}</h3>
      <p className="text-sm text-burgundy-dark/60 mb-4 flex-1">{description}</p>
      <button
        onClick={onClick}
        className="w-full bg-burgundy text-cream py-3 rounded-lg hover:bg-burgundy-medium transition-colors flex items-center justify-center gap-2"
      >
        <span className="text-sm font-medium">{actionLabel}</span>
      </button>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
```

## Filter Bar

Horizontal filter buttons for materials page.

```tsx
// FilterBar.tsx
import { cn } from '@/lib/utils';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  options: FilterOption[];
  selected: string;
  onSelect: (value: string) => void;
  label: string;
}

export function FilterBar({ options, selected, onSelect, label }: FilterBarProps) {
  return (
    <div className="space-y-3">
      <span className="text-xs font-medium tracking-[0.2em] uppercase text-cream/60">{label}</span>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect('')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm transition-colors',
            selected === ''
              ? 'bg-cream text-burgundy-dark'
              : 'bg-white/10 text-cream hover:bg-white/20'
          )}
        >
          Все
        </button>
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm transition-colors',
              selected === option.value
                ? 'bg-cream text-burgundy-dark'
                : 'bg-white/10 text-cream hover:bg-white/20'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

## Glass Card

Card with glass morphism effect for dark backgrounds.

```tsx
// GlassCard.tsx
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn('bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg', className)}>
      {children}
    </div>
  );
}
```

## Gold Button

Primary button for login page (gold accent).

```tsx
// GoldButton.tsx
import { cn } from '@/lib/utils';

interface GoldButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

export function GoldButton({
  children,
  onClick,
  type = 'button',
  disabled,
  className,
}: GoldButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full py-3 px-6 bg-[#C9A86C] text-[#1a1a1a] font-medium',
        'hover:bg-[#D4BC94] transition-colors disabled:opacity-50',
        className
      )}
    >
      {children}
    </button>
  );
}
```

## Dark Input

Input field for dark backgrounds (login page).

```tsx
// DarkInput.tsx
import { cn } from '@/lib/utils';

interface DarkInputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
}

export function DarkInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  required,
}: DarkInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm text-cream/80">
          {label}
          {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full px-4 py-3 bg-white text-burgundy-dark placeholder:text-gray-400',
          'border-0 focus:outline-none focus:ring-2 focus:ring-[#C9A86C]'
        )}
      />
    </div>
  );
}
```

## Usage Examples

### Stories section on admin page

```tsx
<section className="mb-12">
  <StoriesCarousel stories={stories} />
  <p className="mt-4 text-cream/60 text-sm tracking-wide">
    НОВОСТИ, СТАРТЫ ПРОДАЖ В ФОРМАТЕ СТОРИС
  </p>
</section>
```

### Action cards grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <ActionCard
    icon={Upload}
    title="Загрузка материалов"
    description="Добавьте новую презентацию или документ"
    actionLabel="Открыть форму"
    onClick={() => setShowUpload(true)}
  />
  <ActionCard
    icon={FileText}
    title="Материалы"
    description="Доступ к презентациям и документам"
    actionLabel="Перейти"
    href="/materials"
  />
  <ActionCard
    icon={LayoutGrid}
    title="Администрирование"
    description="Управление контентом"
    actionLabel="Открыть"
    href="/admin"
  />
</div>
```

### Filter bar on materials page

```tsx
<FilterBar
  label="Город"
  options={cities.map(c => ({ value: c, label: c }))}
  selected={selectedCity}
  onSelect={setSelectedCity}
/>
```
