'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    comment: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/client-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Клиент успешно передан в CRM');
        setFormData({ fullName: '', phone: '', city: '', comment: '' });
      } else {
        setMessage('Произошла ошибка. Попробуйте позже.');
      }
    } catch {
      setMessage('Произошла ошибка. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Личный кабинет</h1>

      <Card>
        <CardHeader>
          <CardTitle>Передать клиента</CardTitle>
          <CardDescription>
            Заполните форму ниже, чтобы передать клиента в CRM систему
          </CardDescription>
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
              <label className="text-sm font-medium mb-1 block">ФИО клиента *</label>
              <Input
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                required
                placeholder="Иванов Иван Иванович"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Телефон *</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                required
                placeholder="+7 (999) 123-45-67"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Город *</label>
              <Input
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                required
                placeholder="Москва"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Комментарий</label>
              <textarea
                value={formData.comment}
                onChange={e => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Дополнительная информация о клиенте"
                className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Передать клиента'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
