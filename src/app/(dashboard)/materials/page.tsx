import { prisma } from '@/lib/prisma';

interface MaterialsPageProps {
  searchParams: {
    city?: string;
    propertyType?: string;
  };
}

export default async function MaterialsPage({ searchParams }: MaterialsPageProps) {
  const { city, propertyType } = searchParams;

  const where: {
    city?: string;
    propertyType?: string;
  } = {};

  if (city) where.city = city;
  if (propertyType) where.propertyType = propertyType;

  const materials = await prisma.material.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  const cities = await prisma.material.findMany({
    select: { city: true },
    distinct: ['city'],
  });

  const propertyTypes = await prisma.material.findMany({
    select: { propertyType: true },
    distinct: ['propertyType'],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Материалы</h1>
      </div>

      <div className="flex gap-4">
        <div className="flex gap-2">
          <a
            href="/materials"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !city
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Все города
          </a>
          {cities.map(c => (
            <a
              key={c.city}
              href={`/materials?city=${c.city}${propertyType ? `&propertyType=${propertyType}` : ''}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                city === c.city
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {c.city}
            </a>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <a
          href="/materials"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !propertyType
              ? 'bg-secondary text-secondary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          Все типы
        </a>
        {propertyTypes.map(pt => (
          <a
            key={pt.propertyType}
            href={`/materials?propertyType=${pt.propertyType}${city ? `&city=${city}` : ''}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              propertyType === pt.propertyType
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {pt.propertyType}
          </a>
        ))}
      </div>

      {materials.length === 0 ? (
        <div className="p-8 border-2 border-dashed rounded-lg text-center">
          <p className="text-muted-foreground">Материалы не найдены</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map(material => (
            <div
              key={material.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {material.thumbnailUrl && (
                <div className="aspect-video bg-muted">
                  <img
                    src={material.thumbnailUrl}
                    alt={material.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold mb-1">{material.title}</h3>
                {material.description && (
                  <p className="text-sm text-muted-foreground mb-3">{material.description}</p>
                )}
                <div className="flex gap-2 text-xs text-muted-foreground mb-3">
                  <span className="bg-muted px-2 py-1 rounded">{material.city}</span>
                  <span className="bg-muted px-2 py-1 rounded">{material.propertyType}</span>
                </div>
                <a
                  href={material.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  Скачать презентацию →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
