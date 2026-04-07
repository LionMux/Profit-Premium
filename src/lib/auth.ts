import { compare, hash } from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from './prisma';

const credentialsSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().optional(),
  code: z.string().optional(),
  type: z.enum(['email', 'sms']),
});

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        phone: { label: 'Phone', type: 'tel' },
        password: { label: 'Password', type: 'password' },
        code: { label: 'Code', type: 'text' },
        type: { label: 'Type', type: 'text' },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { type, email, phone, password, code } = parsed.data;

        // Email + Password authentication
        if (type === 'email' && email && password) {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.passwordHash) return null;
          if (!user.isActive) return null;

          const isValid = await compare(password, user.passwordHash);
          if (!isValid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        // SMS authentication
        if (type === 'sms' && phone && code) {
          // Normalize phone number
          const normalizedPhone = normalizePhone(phone);

          // Find the most recent valid SMS code
          const smsCode = await prisma.smsCode.findFirst({
            where: {
              phone: normalizedPhone,
              code: code,
              expiresAt: {
                gt: new Date(),
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          });

          // Invalid code - don't delete, let attempts be tracked
          if (!smsCode) {
            return null;
          }

          // Check attempts
          if (smsCode.attempts >= 3) {
            return null;
          }

          // Delete the used code
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
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});

/**
 * Normalize phone number to +7XXXXXXXXXX format
 */
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+7${digits}`;
  }
  if (digits.length === 11 && digits.startsWith('7')) {
    return `+${digits}`;
  }
  if (digits.length === 11 && digits.startsWith('8')) {
    return `+7${digits.slice(1)}`;
  }
  return phone;
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return compare(password, hash);
}

/**
 * Verify SMS code via API (for client-side verification before signIn)
 */
export async function verifySMSCode(phone: string, code: string): Promise<{
  success: boolean;
  user?: {
    id: string;
    email: string | null;
    phone: string | null;
    name: string;
    role: string;
  };
  error?: string;
}> {
  try {
    const response = await fetch('/api/auth/sms/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'Verification failed' };
    }

    return { success: true, user: data.user };
  } catch {
    return { success: false, error: 'Network error' };
  }
}
