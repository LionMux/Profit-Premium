/**
 * Server Page Component Template
 * Use for: Next.js pages with data fetching
 * Location: src/app/[route]/page.tsx
 */

import { prisma } from '@/lib/prisma';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

// Define search params interface if needed
interface PageProps {
  searchParams: {
    filter?: string;
  };
}

export default async function (/*PageName*/ { searchParams }: PageProps) {
  const { filter } = searchParams;

  // Build where clause based on filters
  const where: Record<string, unknown> = {};
  if (filter) where.filter = filter;

  // Fetch data from database
  const items = await prisma.model.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  // Get unique values for filters
  const filters = await prisma.model.findMany({
    select: { filter: true },
    distinct: ['filter'],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Заголовок страницы</h1>
      </div>

      {/* Filter bar */}
      <div className="flex gap-2">
        <a
          href="/route"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !filter
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          Все
        </a>
        {filters.map(f => (
          <a
            key={f.filter}
            href={`/route?filter=${f.filter}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.filter
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {f.filter}
          </a>
        ))}
      </div>

      {/* Content grid */}
      {items.length === 0 ? (
        <div className="p-8 border-2 border-dashed rounded-lg text-center">
          <p className="text-muted-foreground">Нет данных</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>{/* Content */}</CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
