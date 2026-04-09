import { prisma } from '@/lib/prisma';
import { FilterBar } from '@/components/materials/FilterBar';
import { FilterDrawer } from '@/components/materials/FilterDrawer';
import { MaterialCard } from '@/components/materials/MaterialCard';
import { FileText, SlidersHorizontal } from 'lucide-react';

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

  const [materials, citiesData, propertyTypesData] = await Promise.all([
    prisma.material.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.material.findMany({
      select: { city: true },
      distinct: ['city'],
    }),
    prisma.material.findMany({
      select: { propertyType: true },
      distinct: ['propertyType'],
    }),
  ]);

  const cities = citiesData.map((c) => c.city);
  const propertyTypes = propertyTypesData.map((pt) => pt.propertyType);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-cream">Материалы</h1>
          <p className="text-sm text-cream/60 mt-2">
            Презентации и документы по объектам недвижимости
          </p>
        </div>
        
        {/* Mobile filter button */}
        <FilterDrawer
          cities={cities}
          propertyTypes={propertyTypes}
          activeCity={city}
          activeType={propertyType}
        />
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="h-4 w-4 text-cream/60" />
          <span className="text-sm font-medium text-cream/80">Фильтры</span>
        </div>
        <FilterBar
          cities={cities}
          propertyTypes={propertyTypes}
          activeCity={city}
          activeType={propertyType}
        />
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-cream/60">
          Найдено материалов: <span className="font-medium text-cream">{materials.length}</span>
        </p>
      </div>

      {/* Materials Grid */}
      {materials.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-cream/20 rounded-xl bg-white/5">
          <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-cream/40" />
          </div>
          <h3 className="text-lg font-medium text-cream mb-2">
            Материалы не найдены
          </h3>
          <p className="text-sm text-cream/60 text-center max-w-md">
            {city || propertyType
              ? 'Попробуйте изменить фильтры или сбросить их, чтобы увидеть больше результатов'
              : 'Новые материалы появятся здесь в ближайшее время'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {materials.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      )}
    </div>
  );
}
