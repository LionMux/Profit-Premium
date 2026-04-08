/**
 * Form Component Template
 * Use for: Forms with validation
 * Location: src/components/[feature]/
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface FormData {
  field1: string;
  field2: string;
}

export function /*FormName*/() {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    field1: '',
    field2: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showToast('Успешно сохранено', 'success');
        setFormData({ field1: '', field2: '' });
        setMessage('Операция выполнена успешно');
      } else {
        const error = await response.json();
        showToast(error.message || 'Произошла ошибка', 'error');
        setMessage('Произошла ошибка. Попробуйте позже.');
      }
    } catch {
      showToast('Ошибка сети', 'error');
      setMessage('Произошла ошибка. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Заголовок формы</CardTitle>
        <CardDescription>Описание формы</CardDescription>
      </CardHeader>
      <CardContent>
        {message && (
          <div
            className={`mb-4 p-3 rounded-md text-sm ${
              message.includes('успешно')
                ? 'bg-green-50 text-green-600'
                : 'bg-red-50 text-red-500'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Поле 1 *
            </label>
            <Input
              value={formData.field1}
              onChange={(e) => setFormData({ ...formData, field1: e.target.value })}
              required
              placeholder="Введите значение"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Поле 2
            </label>
            <Input
              value={formData.field2}
              onChange={(e) => setFormData({ ...formData, field2: e.target.value })}
              placeholder="Введите значение"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Отправить'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
