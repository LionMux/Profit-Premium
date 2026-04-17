import { prisma } from '@/lib/prisma';
import { FilterBar } from '@/components/materials/FilterBar';
import { FilterDrawer } from '@/components/materials/FilterDrawer';
import { MaterialCard } from '@/components/materials/MaterialCard';
import { FileText, SlidersHorizontal, Download, Building2 } from 'lucide-react';
import { AbstractSkyline } from '@/components/illustrations/BuildingIllustrations';

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

  // Group materials by city for display
  const materialsByCity = materials.reduce((acc, material) => {
    if (!acc[material.city]) {
      acc[material.city] = [];
    }
    acc[material.city].push(material);
    return acc;
  }, {} as Record<string, typeof materials>);

  return (
    <div className="min-h-[calc(100vh-200px)] relative">
      {/* Decorative Background */}
      <div className="absolute top-20 right-0 w-96 h-96 opacity-[0.06] pointer-events-none">
        <AbstractSkyline className="w-full h-full text-cream" />
      </div>

      {/* Header Section */}
      <section className="mb-10">
        <p className="text-cream/60 text-[10px] tracking-[0.3em] mb-3 uppercase">
          Презентации и документы
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h1 className="font-serif text-cream text-4xl lg:text-5xl font-semibold mb-3 uppercase tracking-wide leading-tight">
              Материалы
            </h1>
            <p className="text-cream/60 max-w-lg leading-relaxed">
              Все презентации и документы по объектам недвижимости.
              Используйте фильтры для быстрого поиска.
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10  bg-cream/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-cream/60" />
              </div>
              <div>
                <p className="text-2xl font-serif text-cream">{materials.length}</p>
                <p className="text-xs text-cream/40 uppercase tracking-wider">материалов</p>
              </div>
            </div>
            {cities.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="h-10 w-10  bg-cream/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-cream/60" />
                </div>
                <div>
                  <p className="text-2xl font-serif text-cream">{cities.length}</p>
                  <p className="text-xs text-cream/40 uppercase tracking-wider">городов</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="mb-10">
        {/* Desktop Filters */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="h-4 w-4 text-cream/60" />
            <span className="text-xs tracking-[0.2em] uppercase text-cream/60">Фильтры</span>
          </div>
          <div className="bg-burgundy  border border-white/10 p-6">
            <FilterBar
              cities={cities}
              propertyTypes={propertyTypes}
              activeCity={city}
              activeType={propertyType}
            />
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden">
          <FilterDrawer
            cities={cities}
            propertyTypes={propertyTypes}
            activeCity={city}
            activeType={propertyType}
          />
        </div>
      </section>

      {/* Results Section */}
      <section>
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-cream/60">
            Найдено: <span className="font-medium text-cream">{materials.length}</span>
            {city && (
              <span className="text-cream/40"> в {city}</span>
            )}
            {propertyType && (
              <span className="text-cream/40">, {propertyType}</span>
            )}
          </p>

          {(city || propertyType) && (
            <a
              href="/materials"
              className="text-sm text-cream/60 hover:text-cream transition-colors underline underline-offset-4"
            >
              Сбросить фильтры
            </a>
          )}
        </div>

        {/* Materials Grid */}
        {materials.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-cream/20  bg-burgundy">
            <div className="h-20 w-20 bg-cream/10 flex items-center justify-center mb-6">
              <FileText className="h-10 w-10 text-cream/30" />
            </div>
            <h3 className="font-serif text-xl text-cream mb-2">
              Материалы не найдены
            </h3>
            <p className="text-cream/60 text-center max-w-md">
              {city || propertyType
                ? 'Попробуйте изменить фильтры или сбросить их, чтобы увидеть больше результатов'
                : 'Новые материалы появятся здесь в ближайшее время'}
            </p>
            {(city || propertyType) && (
              <a
                href="/materials"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-cream/10 text-cream  hover:bg-cream/20 transition-colors"
              >
                Сбросить фильтры
              </a>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {materials.map((material, index) => (
              <MaterialCard
                key={material.id}
                material={material}
                delay={index * 0.05}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
