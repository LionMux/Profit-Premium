'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter, X } from 'lucide-react';
import { useState } from 'react';

interface FilterDrawerProps {
  cities: string[];
  propertyTypes: string[];
  activeCity?: string;
  activeType?: string;
}

export function FilterDrawer({ cities, propertyTypes, activeCity, activeType }: FilterDrawerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
  }

  function clearFilters() {
    router.push('/materials');
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'lg:hidden border-cream/30 text-cream hover:bg-white/10 hover:text-cream',
            hasActiveFilters && 'border-cream bg-cream/10'
          )}
        >
          <Filter className="h-4 w-4 mr-2" />
          Фильтры
          {hasActiveFilters && (
            <span className="ml-2 bg-cream text-burgundy-dark text-xs  px-2 py-0.5 font-medium">
              {(activeCity ? 1 : 0) + (activeType ? 1 : 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-burgundy-dark border-white/10">
        <SheetHeader>
          <SheetTitle className="text-cream">Фильтры</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Города */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-cream/70">Город</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateFilter(undefined, activeType)}
                className={cn(
                  ' px-4 py-1.5 h-auto text-sm font-medium transition-colors border',
                  !activeCity
                    ? 'bg-cream text-burgundy-dark border-cream'
                    : 'bg-transparent text-cream/80 border-cream/50 hover:bg-white/10'
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
                      ? 'bg-cream text-burgundy-dark border-cream'
                      : 'bg-transparent text-cream/80 border-cream/50 hover:bg-white/10'
                  )}
                >
                  {city}
                </Button>
              ))}
            </div>
          </div>

          {/* Типы недвижимости */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-cream/70">Тип недвижимости</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateFilter(activeCity, undefined)}
                className={cn(
                  ' px-4 py-1.5 h-auto text-sm font-medium transition-colors border',
                  !activeType
                    ? 'bg-cream text-burgundy-dark border-cream'
                    : 'bg-transparent text-cream/80 border-cream/50 hover:bg-white/10'
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
                      ? 'bg-cream text-burgundy-dark border-cream'
                      : 'bg-transparent text-cream/80 border-cream/50 hover:bg-white/10'
                  )}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Clear button */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-white/10">
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="w-full border-cream/30 text-cream hover:bg-white/10"
              >
                <X className="h-4 w-4 mr-2" />
                Очистить все фильтры
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
