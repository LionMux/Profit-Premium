/**
 * Transfer Client Form Template
 * Use for: Profile page "Передать клиента" feature
 * Location: src/components/profile/TransferClientForm.tsx
 * 
 * Features:
 * - Full name, phone, city fields
 * - Zod validation
 * - Bitrix24 integration
 * - Toast notifications
 * - Loading states
 */

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import InputMask from 'react-input-mask';

const transferSchema = z.object({
  fullName: z.string()
    .min(3, 'Минимум 3 символа')
    .max(100, 'Максимум 100 символов')
    .regex(/^[а-яА-ЯёЁa-zA-Z\s]+$/, 'Только буквы и пробелы'),
  phone: z.string()
    .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Введите корректный номер телефона'),
  city: z.string()
    .min(2, 'Минимум 2 символа')
    .max(50, 'Максимум 50 символов'),
});

type TransferFormData = z.infer<typeof transferSchema>;

interface TransferClientFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function TransferClientForm({ onSuccess, className }: TransferClientFormProps) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      city: '',
    },
  });

  async function onSubmit(data: TransferFormData) {
    try {
      const response = await fetch('/api/client-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Не удалось передать клиента');
      }

      toast({
        title: 'Успешно',
        description: 'Клиент успешно передан в CRM',
      });

      reset();
      onSuccess?.();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Не удалось передать клиента',
        variant: 'destructive',
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-4', className)}>
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName">ФИО клиента *</Label>
        <Input
          id="fullName"
          placeholder="Иванов Иван Иванович"
          {...register('fullName')}
          className={cn(
            errors.fullName && 'border-red-500 focus-visible:ring-red-500'
          )}
          disabled={isSubmitting}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500" role="alert">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Телефон *</Label>
        <InputMask
          mask="+7 (999) 999-99-99"
          maskChar="_"
          {...register('phone')}
        >
          {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
            <Input
              {...inputProps}
              id="phone"
              type="tel"
              placeholder="+7 (999) 999-99-99"
              className={cn(
                errors.phone && 'border-red-500 focus-visible:ring-red-500'
              )}
              disabled={isSubmitting}
            />
          )}
        </InputMask>
        {errors.phone && (
          <p className="text-sm text-red-500" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label htmlFor="city">Город *</Label>
        <Input
          id="city"
          placeholder="Москва"
          {...register('city')}
          className={cn(
            errors.city && 'border-red-500 focus-visible:ring-red-500'
          )}
          disabled={isSubmitting}
        />
        {errors.city && (
          <p className="text-sm text-red-500" role="alert">
            {errors.city.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Отправка...
          </>
        ) : (
          'Передать клиента'
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Данные клиента будут отправлены в CRM систему
      </p>
    </form>
  );
}
