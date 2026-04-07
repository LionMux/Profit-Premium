import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const clientLeadSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(10),
  city: z.string().min(1),
  comment: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = clientLeadSchema.parse(body);

    const lead = await prisma.clientLead.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });

    // TODO: Send to Bitrix24
    // await sendToBitrix24(lead);

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error('Error creating client lead:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
