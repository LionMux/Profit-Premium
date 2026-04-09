/**
 * Universal Form Template
 * Use for: Any form with react-hook-form + zod validation
 * Location: src/components/[feature]/[FormName].tsx
 * 
 * Features:
 * - react-hook-form integration
 * - Zod validation
 * - Error handling
 * - Toast notifications
 * - Loading states
 * - TypeScript types
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

// Define your schema here
const formSchema = z.object({
  // Example fields - replace with your own
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
  name: z.string().min(2, 'Минимум 2 символа'),
});

type FormData = z.infer<typeof formSchema>;

interface FormTemplateProps {
  onSuccess?: () => void;
  className?: string;
}

export function FormTemplate({ onSuccess, className }: FormTemplateProps) {
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  async function onSubmit(data: FormData) {
    try {
      // Replace with your API endpoint
      const response = await fetch('/api/your-endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Произошла ошибка');
      }

      toast({
        title: 'Успешно',
        description: 'Операция выполнена успешно',
      });

      reset();
      onSuccess?.();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Произошла ошибка',
        variant: 'destructive',
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-4', className)}>
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@mail.ru"
          {...register('email')}
          className={cn(
            errors.email && 'border-red-500 focus-visible:ring-red-500'
          )}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-sm text-red-500" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password">Пароль *</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••"
          {...register('password')}
          className={cn(
            errors.password && 'border-red-500 focus-visible:ring-red-500'
          )}
          disabled={isSubmitting}
        />
        {errors.password && (
          <p className="text-sm text-red-500" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Имя *</Label>
        <Input
          id="name"
          placeholder="Иван Иванов"
          {...register('name')}
          className={cn(
            errors.name && 'border-red-500 focus-visible:ring-red-500'
          )}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="text-sm text-red-500" role="alert">
            {errors.name.message}
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
          'Отправить'
        )}
      </Button>
    </form>
  );
}
