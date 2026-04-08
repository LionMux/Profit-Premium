/**
 * POST /api/auth/sms/send
 *
 * Send SMS verification code to phone number
 * Rate limited: max 3 SMS per phone per hour
 *
 * @body { phone: string }
 * @returns { success: boolean, message?: string }
 * @errors 400 - Invalid phone format
 * @errors 429 - Rate limit exceeded
 * @errors 500 - SMS service error
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendSMS } from '@/lib/sms';
import { generateSMSCode } from '@/lib/utils';

const sendSchema = z.object({
  phone: z.string().min(10).max(20),
});

// Phone validation regex for Russian numbers
const PHONE_REGEX = /^\+7\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;

// Rate limit: 3 SMS per hour per phone
const SMS_LIMIT = 3;
const SMS_WINDOW_HOURS = 1;

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  // Ensure it starts with 7 (Russia)
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
    const parsed = sendSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Неверный формат номера телефона',
        },
        { status: 400 }
      );
    }

    const { phone } = parsed.data;
    const normalizedPhone = normalizePhone(phone);

    // Validate phone format
    if (!PHONE_REGEX.test(normalizedPhone)) {
      return NextResponse.json(
        {
          success: false,
          error: 'INVALID_PHONE',
          message: 'Неверный формат номера телефона. Используйте формат +7 (999) 123-45-67',
        },
        { status: 400 }
      );
    }

    // Check rate limit
    const oneHourAgo = new Date(Date.now() - SMS_WINDOW_HOURS * 60 * 60 * 1000);
    const recentSmsCount = await prisma.smsCode.count({
      where: {
        phone: normalizedPhone,
        createdAt: {
          gte: oneHourAgo,
        },
      },
    });

    if (recentSmsCount >= SMS_LIMIT) {
      return NextResponse.json(
        {
          success: false,
          error: 'RATE_LIMIT',
          message: 'Превышен лимит отправки SMS. Попробуйте через час.',
        },
        { status: 429 }
      );
    }

    // Generate 6-digit code
    const code = generateSMSCode();

    // Set expiration to 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Save code to database
    await prisma.smsCode.create({
      data: {
        phone: normalizedPhone,
        code,
        expiresAt,
        attempts: 0,
      },
    });

    // Send SMS via SMS.ru
    const smsResult = await sendSMS(normalizedPhone, code);

    if (!smsResult.success) {
      // Clean up the code from DB if SMS failed
      await prisma.smsCode.deleteMany({
        where: {
          phone: normalizedPhone,
          code,
        },
      });

      return NextResponse.json(
        {
          success: false,
          error: 'SMS_ERROR',
          message: smsResult.error || 'Не удалось отправить SMS. Попробуйте позже.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Код подтверждения отправлен',
    });
  } catch (error) {
    console.error('SMS send error:', error);
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
