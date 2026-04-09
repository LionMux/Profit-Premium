/**
 * Filter Bar Template
 * Use for: Materials page filtering by city and property type
 * Location: src/components/materials/FilterBar.tsx
 * 
 * Features:
 * - Button-based filters (not dropdown)
 * - Desktop: horizontal scrollable row
 * - Mobile: Sheet drawer
 * - URL sync
 * - Active state visualization
 * - "All" reset option
 */

'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter, X } from 'lucide-react';

interface FilterBarProps {
  cities: string[];
  propertyTypes: string[];
  activeCity?: string;
  activeType?: string;
  className?: string;
}

export function FilterBar({
  cities,
  propertyTypes,
  activeCity,
  activeType,
  className,
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (value === null || value === 'all') {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (type: 'city' | 'type', value: string | null) => {
    const queryString = createQueryString(type, value);
    router.push(`/materials${queryString ? `?${queryString}` : ''}`);
  };

  const hasActiveFilters = activeCity || activeType;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* City Filter */}
      <div>
        <h4 className="text-sm font-medium mb-3">Город</h4>
        <div className="flex flex-wrap gap-2">
          <FilterButton
            label="Все"
            isActive={!activeCity}
            onClick={() => handleFilterChange('city', null)}
          />
          {cities.map((city) => (
            <FilterButton
              key={city}
              label={city}
              isActive={activeCity === city}
              onClick={() => handleFilterChange('city', city)}
            />
          ))}
        </div>
      </div>

      {/* Property Type Filter */}
      <div>
        <h4 className="text-sm font-medium mb-3">Тип недвижимости</h4>
        <div className="flex flex-wrap gap-2">
          <FilterButton
            label="Все"
            isActive={!activeType}
            onClick={() => handleFilterChange('type', null)}
          />
          {propertyTypes.map((type) => (
            <FilterButton
              key={type}
              label={type}
              isActive={activeType === type}
              onClick={() => handleFilterChange('type', type)}
            />
          ))}
        </div>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            handleFilterChange('city', null);
            handleFilterChange('type', null);
          }}
          className="w-full"
        >
          <X className="h-4 w-4 mr-2" />
          Сбросить фильтры
        </Button>
      )}
    </div>
  );

  return (
    <div className={cn('', className)}>
      {/* Desktop: Horizontal scrollable */}
      <div className="hidden md:block">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 space-y-4">
            {/* City Row */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Город:</span>
              <FilterChip
                label="Все"
                isActive={!activeCity}
                onClick={() => handleFilterChange('city', null)}
              />
              {cities.map((city) => (
                <FilterChip
                  key={city}
                  label={city}
                  isActive={activeCity === city}
                  onClick={() => handleFilterChange('city', city)}
                />
              ))}
            </div>

            {/* Type Row */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Тип:</span>
              <FilterChip
                label="Все"
                isActive={!activeType}
                onClick={() => handleFilterChange('type', null)}
              />
              {propertyTypes.map((type) => (
                <FilterChip
                  key={type}
                  label={type}
                  isActive={activeType === type}
                  onClick={() => handleFilterChange('type', type)}
                />
              ))}
            </div>
          </div>

          {/* Reset Button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                handleFilterChange('city', null);
                handleFilterChange('type', null);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Сбросить
            </Button>
          )}
        </div>
      </div>

      {/* Mobile: Sheet Drawer */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              Фильтры
              {hasActiveFilters && (
                <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                  {(activeCity ? 1 : 0) + (activeType ? 1 : 0)}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Фильтры</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

// Desktop filter chip
interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterChip({ label, isActive, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground hover:bg-muted/80'
      )}
    >
      {label}
    </button>
  );
}

// Mobile filter button
interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size="sm"
      onClick={onClick}
      className={cn(
        'justify-start',
        isActive && 'bg-primary text-primary-foreground'
      )}
    >
      {label}
    </Button>
  );
}
