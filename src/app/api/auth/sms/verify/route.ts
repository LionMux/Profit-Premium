/**
 * POST /api/auth/sms/verify
 *
 * Verify SMS code and return user info for session creation
 * Max 3 attempts per code
 *
 * @body { phone: string, code: string }
 * @returns { success: boolean, user?: object }
 * @errors 400 - Invalid input
 * @errors 401 - Invalid or expired code
 * @errors 403 - Max attempts exceeded
 * @errors 404 - User not found and auto-create disabled
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const verifySchema = z.object({
  phone: z.string().min(10).max(20),
  code: z.string().length(6),
});

const MAX_ATTEMPTS = 3;

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+7${digits}`;
  }
  if (digits.length === 11 && digits.startsWith('7')) {
    return `+${digits}`;
  }
  return phone;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Неверный формат данных',
        },
        { status: 400 }
      );
    }

    const { phone, code } = parsed.data;
    const normalizedPhone = normalizePhone(phone);

    // Find the most recent code for this phone
    const smsCode = await prisma.smsCode.findFirst({
      where: {
        phone: normalizedPhone,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!smsCode) {
      return NextResponse.json(
        {
          success: false,
          error: 'CODE_NOT_FOUND',
          message: 'Код не найден. Запросите новый код.',
        },
        { status: 401 }
      );
    }

    // Check if code is expired
    if (new Date() > smsCode.expiresAt) {
      // Delete expired code
      await prisma.smsCode.delete({
        where: { id: smsCode.id },
      });

      return NextResponse.json(
        {
          success: false,
          error: 'CODE_EXPIRED',
          message: 'Код истёк. Запросите новый код.',
        },
        { status: 401 }
      );
    }

    // Check max attempts
    if (smsCode.attempts >= MAX_ATTEMPTS) {
      return NextResponse.json(
        {
          success: false,
          error: 'MAX_ATTEMPTS',
          message: 'Превышено количество попыток. Запросите новый код.',
        },
        { status: 403 }
      );
    }

    // Verify code
    if (smsCode.code !== code) {
      // Increment attempts
      await prisma.smsCode.update({
        where: { id: smsCode.id },
        data: { attempts: { increment: 1 } },
      });

      const remainingAttempts = MAX_ATTEMPTS - (smsCode.attempts + 1);

      return NextResponse.json(
        {
          success: false,
          error: 'INVALID_CODE',
          message:
            remainingAttempts > 0
              ? `Неверный код. Осталось попыток: ${remainingAttempts}`
              : 'Превышено количество попыток. Запросите новый код.',
        },
        { status: 401 }
      );
    }

    // Code is valid - delete it to prevent reuse
    await prisma.smsCode.delete({
      where: { id: smsCode.id },
    });

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { phone: normalizedPhone },
    });

    if (!user) {
      // Auto-create new partner user
      user = await prisma.user.create({
        data: {
          phone: normalizedPhone,
          name: `Партнер ${normalizedPhone.slice(-4)}`,
          role: 'PARTNER',
          isActive: true,
        },
      });
    }

    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: 'USER_INACTIVE',
          message: 'Аккаунт заблокирован. Обратитесь к администратору.',
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('SMS verify error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'Произошла ошибка. Попробуйте позже.',
      },
      { status: 500 }
    );
  }
}
