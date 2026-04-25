import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const storySchema = z.object({
  title: z.string().min(1),
  imageUrl: z.string().min(1),
  link: z.string().optional().nullable(),
});

export async function GET() {
  try {
    const stories = await prisma.story.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (!user || (user.role !== 'ADMIN' && user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const data = storySchema.parse(body);

    const maxOrder = await prisma.story.aggregate({
      _max: { order: true },
    });

    const story = await prisma.story.create({
      data: {
        ...data,
        order: (maxOrder._max.order ?? 0) + 1,
        isActive: true,
      },
    });

    return NextResponse.json(story, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error creating story:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
