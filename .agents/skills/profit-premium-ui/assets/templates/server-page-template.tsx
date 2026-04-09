/**
 * Server Page Template with Data Fetching
 * Use for: Next.js pages with Prisma data fetching
 * Location: src/app/[route]/page.tsx
 * 
 * Features:
 * - Server Component (async)
 * - Prisma data fetching
 * - Search params handling
 * - Filter support
 * - Loading states
 * - Error handling
 */

import { prisma } from '@/lib/prisma';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FilterBar } from '@/components/materials/FilterBar';
import { notFound } from 'next/navigation';

// Define search params interface
interface PageProps {
  searchParams: {
    city?: string;
    type?: string;
    page?: string;
  };
}

export default async function ServerPageTemplate({ searchParams }: PageProps) {
  const { city, type, page = '1' } = searchParams;
  const currentPage = parseInt(page, 10);
  const itemsPerPage = 12;

  // Build where clause based on filters
  const where: Record<string, unknown> = {};
  if (city) where.city = city;
  if (type) where.propertyType = type;

  try {
    // Fetch data and filter options in parallel
    const [items, totalCount, cities, types] = await Promise.all([
      // Main data query
      prisma.material.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      
      // Total count for pagination
      prisma.material.count({ where }),
      
      // Unique cities for filter
      prisma.material.findMany({
        select: { city: true },
        distinct: ['city'],
        orderBy: { city: 'asc' },
      }),
      
      // Unique property types for filter
      prisma.material.findMany({
        select: { propertyType: true },
        distinct: ['propertyType'],
        orderBy: { propertyType: 'asc' },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Заголовок страницы</h1>
            <p className="text-muted-foreground">
              Описание страницы и количество: {totalCount}
            </p>
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          cities={cities.map((c) => c.city)}
          propertyTypes={types.map((t) => t.propertyType)}
          activeCity={city}
          activeType={type}
        />

        {/* Active Filters Display */}
        {(city || type) && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Активные фильтры:</span>
            {city && (
              <Badge variant="secondary" className="gap-1">
                Город: {city}
              </Badge>
            )}
            {type && (
              <Badge variant="secondary" className="gap-1">
                Тип: {type}
              </Badge>
            )}
          </div>
        )}

        {/* Content Grid */}
        {items.length === 0 ? (
          <div className="p-12 border-2 border-dashed rounded-lg text-center">
            <p className="text-muted-foreground text-lg">Нет данных</p>
            <p className="text-sm text-muted-foreground mt-1">
              Попробуйте изменить фильтры
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{item.city}</Badge>
                      <Badge variant="outline">{item.propertyType}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <a
                    key={pageNum}
                    href={`/materials?page=${pageNum}${city ? `&city=${city}` : ''}${type ? `&type=${type}` : ''}`}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      currentPage === pageNum
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    )}
                  >
                    {pageNum}
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    
    // You could also return an error UI here
    return (
      <div className="p-12 text-center">
        <p className="text-red-500 text-lg">Произошла ошибка при загрузке данных</p>
        <p className="text-muted-foreground mt-2">Попробуйте обновить страницу</p>
      </div>
    );
  }
}

// Helper function for className (if not imported)
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
