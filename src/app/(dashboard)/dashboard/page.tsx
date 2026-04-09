import { prisma } from '@/lib/prisma';
import { StoriesCarousel } from '@/components/stories/StoriesCarousel';

export default async function DashboardPage() {
  const stories = await prisma.story.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-200px)] justify-center">
      {/* Stories Section */}
      <div className="w-full max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="mb-8 lg:mb-12">
          <h2 className="text-cream/80 text-sm lg:text-base tracking-widest uppercase font-medium">
            Новости, старты продаж в формате сторис
          </h2>
        </div>

        {/* Stories Carousel */}
        <StoriesCarousel stories={stories} />

        {/* Empty State */}
        {stories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-cream/20 rounded-2xl">
            <p className="text-cream/60 text-lg text-center">
              Новости и акции появятся здесь позже
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
