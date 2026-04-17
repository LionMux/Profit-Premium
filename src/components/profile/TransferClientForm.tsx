'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, User, Phone, MapPin, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const transferSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Минимум 3 символа')
    .max(100, 'Максимум 100 символов')
    .regex(/^[а-яА-ЯёЁa-zA-Z\s]+$/, 'Только буквы и пробелы'),
  phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Введите корректный номер телефона'),
  city: z.string().min(2, 'Минимум 2 символа').max(50, 'Максимум 50 символов'),
  comment: z.string().max(500, 'Максимум 500 символов').optional(),
});

type TransferFormData = z.infer<typeof transferSchema>;

interface TransferClientFormProps {
  buttonVariant?: 'default' | 'outline' | 'ghost';
  buttonSize?: 'default' | 'sm' | 'lg';
  buttonClassName?: string;
  showAsModal?: boolean;
}

export function TransferClientForm({
  buttonVariant = 'default',
  buttonSize = 'default',
  buttonClassName,
  showAsModal = false,
}: TransferClientFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      city: '',
      comment: '',
    },
  });

  const phoneValue = watch('phone');

  // Маска для телефона
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      if (value[0] === '7' || value[0] === '8') {
        value = value.substring(1);
      }
      let formattedValue = '+7';
      if (value.length > 0) {
        formattedValue += ' (' + value.substring(0, 3);
      }
      if (value.length >= 3) {
        formattedValue += ') ' + value.substring(3, 6);
      }
      if (value.length >= 6) {
        formattedValue += '-' + value.substring(6, 8);
      }
      if (value.length >= 8) {
        formattedValue += '-' + value.substring(8, 10);
      }
      setValue('phone', formattedValue, { shouldValidate: true });
    } else {
      setValue('phone', '', { shouldValidate: true });
    }
  };

  async function onSubmit(data: TransferFormData) {
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/client-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage('Клиент успешно передан в CRM систему');
        reset();
        setTimeout(() => {
          setIsOpen(false);
          setSubmitStatus('idle');
          setStatusMessage('');
        }, 2000);
      } else {
        const error = await response.json();
        setSubmitStatus('error');
        setStatusMessage(error.message || 'Произошла ошибка. Попробуйте позже.');
      }
    } catch {
      setSubmitStatus('error');
      setStatusMessage('Произошла ошибка соединения. Попробуйте позже.');
    }
  }

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Status message */}
      {submitStatus !== 'idle' && (
        <div
          className={`p-3  text-sm ${
            submitStatus === 'success'
              ? 'bg-green-50 text-green-600 border border-green-200'
              : 'bg-red-50 text-red-500 border border-red-200'
          }`}
        >
          {statusMessage}
        </div>
      )}

      {/* ФИО */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          ФИО клиента *
        </Label>
        <Input
          id="fullName"
          placeholder="Иванов Иван Иванович"
          {...register('fullName')}
          aria-invalid={errors.fullName ? 'true' : 'false'}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500" role="alert">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Телефон */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          Телефон *
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+7 (999) 123-45-67"
          value={phoneValue}
          onChange={handlePhoneChange}
          aria-invalid={errors.phone ? 'true' : 'false'}
        />
        {errors.phone && (
          <p className="text-sm text-red-500" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Город */}
      <div className="space-y-2">
        <Label htmlFor="city" className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          Город *
        </Label>
        <Input
          id="city"
          placeholder="Москва"
          {...register('city')}
          aria-invalid={errors.city ? 'true' : 'false'}
        />
        {errors.city && (
          <p className="text-sm text-red-500" role="alert">
            {errors.city.message}
          </p>
        )}
      </div>

      {/* Комментарий */}
      <div className="space-y-2">
        <Label htmlFor="comment" className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          Комментарий
        </Label>
        <Textarea
          id="comment"
          placeholder="Дополнительная информация о клиенте"
          {...register('comment')}
          rows={3}
        />
        {errors.comment && (
          <p className="text-sm text-red-500" role="alert">
            {errors.comment.message}
          </p>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        className="w-full bg-burgundy hover:bg-burgundy-dark"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Отправка...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Передать клиента
          </>
        )}
      </Button>
    </form>
  );

  if (showAsModal) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={buttonVariant} size={buttonSize} className={buttonClassName}>
            <Send className="mr-2 h-4 w-4" />
            Передать клиента
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Передать клиента</DialogTitle>
            <DialogDescription>
              Заполните форму ниже, чтобы передать клиента в CRM систему
            </DialogDescription>
          </DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  return <div className="space-y-4">{formContent}</div>;
}
