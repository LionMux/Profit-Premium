'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface FilterBarProps {
  cities: string[];
  propertyTypes: string[];
  activeCity?: string;
  activeType?: string;
}

export function FilterBar({ cities, propertyTypes, activeCity, activeType }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasActiveFilters = activeCity || activeType;

  function updateFilter(city?: string, type?: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (city) {
      params.set('city', city);
    } else {
      params.delete('city');
    }

    if (type) {
      params.set('propertyType', type);
    } else {
      params.delete('propertyType');
    }

    router.push(`/materials?${params.toString()}`);
  }

  function clearFilters() {
    router.push('/materials');
  }

  return (
    <div className="space-y-4">
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {/* Cities */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => updateFilter(undefined, activeType)}
          className={cn(
            ' px-4 py-1.5 h-auto text-sm font-medium transition-colors border',
            !activeCity
              ? 'bg-cream text-burgundy-dark border-cream hover:bg-cream/90'
              : 'bg-transparent text-cream/80 border-cream/50 hover:bg-white/10 hover:text-cream'
          )}
        >
          Все города
        </Button>
        {cities.map(city => (
          <Button
            key={city}
            variant="ghost"
            size="sm"
            onClick={() => updateFilter(city, activeType)}
            className={cn(
              ' px-4 py-1.5 h-auto text-sm font-medium transition-colors border',
              activeCity === city
                ? 'bg-cream text-burgundy-dark border-cream hover:bg-cream/90'
                : 'bg-transparent text-cream/80 border-cream/50 hover:bg-white/10 hover:text-cream'
            )}
          >
            {city}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Property Types */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => updateFilter(activeCity, undefined)}
          className={cn(
            ' px-4 py-1.5 h-auto text-sm font-medium transition-colors border',
            !activeType
              ? 'bg-cream text-burgundy-dark border-cream hover:bg-cream/90'
              : 'bg-transparent text-cream/80 border-cream/50 hover:bg-white/10 hover:text-cream'
          )}
        >
          Все типы
        </Button>
        {propertyTypes.map(type => (
          <Button
            key={type}
            variant="ghost"
            size="sm"
            onClick={() => updateFilter(activeCity, type)}
            className={cn(
              ' px-4 py-1.5 h-auto text-sm font-medium transition-colors border',
              activeType === type
                ? 'bg-cream text-burgundy-dark border-cream hover:bg-cream/90'
                : 'bg-transparent text-cream/80 border-cream/50 hover:bg-white/10 hover:text-cream'
            )}
          >
            {type}
          </Button>
        ))}
      </div>

      {/* Активные фильтры */}
      {hasActiveFilters && (
        <div className="flex items-center gap-3 pt-2">
          <span className="text-sm text-cream/60">Активные:</span>
          <div className="flex flex-wrap gap-2">
            {activeCity && (
              <Badge
                variant="secondary"
                className="cursor-pointer bg-cream/20 text-cream hover:bg-cream/30 border-0"
                onClick={() => updateFilter(undefined, activeType)}
              >
                {activeCity}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            )}
            {activeType && (
              <Badge
                variant="secondary"
                className="cursor-pointer bg-cream/20 text-cream hover:bg-cream/30 border-0"
                onClick={() => updateFilter(activeCity, undefined)}
              >
                {activeType}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-auto py-1 px-2 text-xs text-cream/60 hover:text-cream hover:bg-transparent"
            >
              Очистить все
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
