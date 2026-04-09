/**
 * SMS Authentication Form Template
 * Use for: Login page SMS authentication
 * Location: src/components/auth/SmsAuthForm.tsx
 * 
 * Features:
 * - Phone input with mask (+7 (999) 999-99-99)
 * - Step 1: Phone entry
 * - Step 2: Code entry
 * - Resend timer (60s)
 * - Error handling
 * - Loading states
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import InputMask from 'react-input-mask';

const phoneSchema = z.object({
  phone: z.string()
    .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Введите корректный номер телефона'),
});

const codeSchema = z.object({
  code: z.string()
    .length(6, 'Код должен содержать 6 цифр')
    .regex(/^\d{6}$/, 'Только цифры'),
});

type PhoneFormData = z.infer<typeof phoneSchema>;
type CodeFormData = z.infer<typeof codeSchema>;

interface SmsAuthFormProps {
  onSuccess: () => void;
  className?: string;
}

type AuthStep = 'phone' | 'code' | 'success';

export function SmsAuthForm({ onSuccess, className }: SmsAuthFormProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<AuthStep>('phone');
  const [phone, setPhone] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Phone form
  const {
    register: registerPhone,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: phoneErrors },
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
  });

  // Code form
  const {
    register: registerCode,
    handleSubmit: handleCodeSubmit,
    formState: { errors: codeErrors },
    setValue: setCodeValue,
  } = useForm<CodeFormData>({
    resolver: zodResolver(codeSchema),
  });

  // Resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  // Send SMS code
  const sendCode = useCallback(async (phoneNumber: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/sms/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Не удалось отправить код');
      }

      setPhone(phoneNumber);
      setStep('code');
      setResendTimer(60);
      toast({
        title: 'Код отправлен',
        description: `Введите 6-значный код из SMS`,
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Не удалось отправить код',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Verify SMS code
  const verifyCode = useCallback(async (data: CodeFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/sms/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code: data.code }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Неверный код');
      }

      setStep('success');
      toast({
        title: 'Успешно',
        description: 'Вы успешно вошли в систему',
      });
      onSuccess();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Неверный код',
        variant: 'destructive',
      });
      // Clear code input on error
      setCodeValue('code', '');
    } finally {
      setIsLoading(false);
    }
  }, [phone, setCodeValue, toast, onSuccess]);

  // Handle phone submit
  const onPhoneSubmit = (data: PhoneFormData) => {
    sendCode(data.phone);
  };

  // Handle code submit
  const onCodeSubmit = (data: CodeFormData) => {
    verifyCode(data);
  };

  // Go back to phone step
  const handleBack = () => {
    setStep('phone');
    setCodeValue('code', '');
  };

  // Resend code
  const handleResend = () => {
    if (resendTimer === 0) {
      sendCode(phone);
    }
  };

  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      {/* Step 1: Phone Entry */}
      {step === 'phone' && (
        <form onSubmit={handlePhoneSubmit(onPhoneSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Номер телефона</Label>
            <InputMask
              mask="+7 (999) 999-99-99"
              maskChar="_"
              {...registerPhone('phone')}
            >
              {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                <Input
                  {...inputProps}
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 999-99-99"
                  className={cn(
                    phoneErrors.phone && 'border-red-500 focus-visible:ring-red-500'
                  )}
                  disabled={isLoading}
                />
              )}
            </InputMask>
            {phoneErrors.phone && (
              <p className="text-sm text-red-500" role="alert">
                {phoneErrors.phone.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Отправка...
              </>
            ) : (
              'Отправить код'
            )}
          </Button>
        </form>
      )}

      {/* Step 2: Code Entry */}
      {step === 'code' && (
        <div className="space-y-4">
          <button
            onClick={handleBack}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Изменить номер
          </button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Код отправлен на {phone}
            </p>
          </div>

          <form onSubmit={handleCodeSubmit(onCodeSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Код подтверждения</Label>
              <Input
                id="code"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="000000"
                {...registerCode('code')}
                className={cn(
                  'text-center text-2xl tracking-widest',
                  codeErrors.code && 'border-red-500 focus-visible:ring-red-500'
                )}
                disabled={isLoading}
                autoFocus
              />
              {codeErrors.code && (
                <p className="text-sm text-red-500 text-center" role="alert">
                  {codeErrors.code.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Проверка...
                </>
              ) : (
                'Подтвердить'
              )}
            </Button>
          </form>

          {/* Resend Timer */}
          <div className="text-center">
            {resendTimer > 0 ? (
              <p className="text-sm text-muted-foreground">
                Отправить код повторно через {resendTimer} сек
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-sm text-primary hover:underline"
              >
                Отправить код повторно
              </button>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Success */}
      {step === 'success' && (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium">Вход выполнен успешно</h3>
          <p className="text-sm text-muted-foreground">
            Перенаправляем в личный кабинет...
          </p>
        </div>
      )}
    </div>
  );
}
