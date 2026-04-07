import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const stories = await prisma.story.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Добро пожаловать!</h1>
        <p className="text-muted-foreground mb-8">
          Здесь вы найдете все материалы для работы с клиентами и сможете передать лиды в CRM.
        </p>
      </section>

      {stories.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Новости и акции</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {stories.map(story => (
              <a
                key={story.id}
                href={story.link || '#'}
                className="flex-shrink-0 w-48 h-64 rounded-lg overflow-hidden relative group"
              >
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-medium text-sm">{story.title}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {stories.length === 0 && (
        <section className="p-8 border-2 border-dashed rounded-lg text-center">
          <p className="text-muted-foreground">Новости и акции появятся здесь позже</p>
        </section>
      )}
    </div>
  );
}
