'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const [authType, setAuthType] = useState<'email' | 'sms'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Email form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // SMS form state
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        type: 'email',
        redirect: false,
      });

      if (result?.error) {
        setError('Неверный email или пароль');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      setError('Произошла ошибка. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSMSSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!codeSent) {
      // TODO: Send SMS code
      setCodeSent(true);
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn('credentials', {
        phone,
        code,
        type: 'sms',
        redirect: false,
      });

      if (result?.error) {
        setError('Неверный код подтверждения');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      setError('Произошла ошибка. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Profit Premium</CardTitle>
          <CardDescription>Вход в личный кабинет партнера</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Button
              variant={authType === 'email' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => {
                setAuthType('email');
                setError('');
              }}
            >
              Email
            </Button>
            <Button
              variant={authType === 'sms' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => {
                setAuthType('sms');
                setError('');
              }}
            >
              SMS
            </Button>
          </div>

          {error && (
            <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>
          )}

          {authType === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="partner@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Пароль</label>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Вход...' : 'Войти'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSMSSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Телефон</label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  placeholder="+7 (999) 123-45-67"
                  disabled={codeSent}
                />
              </div>
              {codeSent && (
                <div>
                  <label className="text-sm font-medium mb-1 block">Код из SMS</label>
                  <Input
                    type="text"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    required
                    placeholder="123456"
                    maxLength={6}
                  />
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Отправка...' : codeSent ? 'Подтвердить' : 'Получить код'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
