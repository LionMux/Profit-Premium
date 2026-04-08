'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PhoneInput } from '@/components/auth/PhoneInput';
import { useToast } from '@/components/ui/use-toast';

// Countdown timer for resend code
const RESEND_DELAY = 60; // seconds

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();

  // Auth type state
  const [authType, setAuthType] = useState<'email' | 'sms'>('email');

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  // Error states
  const [emailError, setEmailError] = useState('');
  const [smsError, setSmsError] = useState('');

  // Email form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // SMS form state
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);

  const codeInputRef = useRef<HTMLInputElement>(null);

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Auto-focus code input when code is sent
  useEffect(() => {
    if (codeSent && codeInputRef.current) {
      codeInputRef.current.focus();
    }
  }, [codeSent]);

  // Clear errors when switching auth type
  const handleAuthTypeChange = useCallback((type: 'email' | 'sms') => {
    setAuthType(type);
    setEmailError('');
    setSmsError('');
  }, []);

  // Handle email login
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        type: 'email',
        redirect: false,
      });

      if (result?.error) {
        setEmailError('Неверный email или пароль');
      } else {
        showToast('Успешный вход!', 'success');
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      setEmailError('Произошла ошибка. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  // Send SMS code
  const sendCode = async () => {
    // Validate phone
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 11) {
      setSmsError('Введите полный номер телефона');
      return;
    }

    setSmsError('');
    setIsSendingCode(true);

    try {
      const response = await fetch('/api/auth/sms/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSmsError(data.message || 'Не удалось отправить код');
        if (data.error === 'RATE_LIMIT') {
          showToast('Превышен лимит отправки SMS', 'error');
        }
      } else {
        setCodeSent(true);
        setCountdown(RESEND_DELAY);
        setAttemptsRemaining(3);
        showToast('Код отправлен на ваш телефон', 'success');
      }
    } catch {
      setSmsError('Произошла ошибка. Попробуйте позже.');
    } finally {
      setIsSendingCode(false);
    }
  };

  // Handle SMS login
  const handleSmsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If code not sent yet, send it
    if (!codeSent) {
      await sendCode();
      return;
    }

    // Validate code
    if (code.length !== 6) {
      setSmsError('Введите 6-значный код');
      return;
    }

    setSmsError('');
    setIsLoading(true);

    try {
      // First verify code via API to get proper error messages
      const verifyResponse = await fetch('/api/auth/sms/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        // Update attempts remaining
        if (verifyData.error === 'INVALID_CODE') {
          const match = verifyData.message?.match(/\d+/);
          if (match) {
            setAttemptsRemaining(parseInt(match[0], 10));
          }
        }

        // Reset form on max attempts or expiration
        if (verifyData.error === 'MAX_ATTEMPTS' || verifyData.error === 'CODE_EXPIRED') {
          setCodeSent(false);
          setCode('');
          setCountdown(0);
        }

        setSmsError(verifyData.message || 'Неверный код');
        setIsLoading(false);
        return;
      }

      // Code verified, now sign in with NextAuth
      const result = await signIn('credentials', {
        phone,
        code,
        type: 'sms',
        redirect: false,
      });

      if (result?.error) {
        setSmsError('Ошибка входа. Попробуйте позже.');
      } else {
        showToast('Успешный вход!', 'success');
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      setSmsError('Произошла ошибка. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset SMS form when switching to email
  const resetSmsForm = () => {
    setPhone('');
    setCode('');
    setCodeSent(false);
    setCountdown(0);
    setSmsError('');
    setAttemptsRemaining(3);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Profit Premium</CardTitle>
          <CardDescription>Вход в личный кабинет партнера</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Auth type tabs */}
          <div className="flex gap-2 mb-6" role="tablist">
            <Button
              variant={authType === 'email' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => {
                handleAuthTypeChange('email');
                resetSmsForm();
              }}
              role="tab"
              aria-selected={authType === 'email'}
            >
              Email
            </Button>
            <Button
              variant={authType === 'sms' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => handleAuthTypeChange('sms')}
              role="tab"
              aria-selected={authType === 'sms'}
            >
              SMS
            </Button>
          </div>

          {authType === 'email' ? (
            // Email login form
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {emailError && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md" role="alert">
                  {emailError}
                </div>
              )}

              <div>
                <label htmlFor="email" className="text-sm font-medium mb-1 block">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="partner@example.com"
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium mb-1 block">
                  Пароль
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Вход...' : 'Войти'}
              </Button>
            </form>
          ) : (
            // SMS login form
            <form onSubmit={handleSmsSubmit} className="space-y-4">
              {smsError && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md" role="alert">
                  {smsError}
                </div>
              )}

              <div>
                <label htmlFor="phone" className="text-sm font-medium mb-1 block">
                  Телефон
                </label>
                <PhoneInput
                  id="phone"
                  value={phone}
                  onChange={setPhone}
                  disabled={codeSent || isSendingCode}
                  error={!codeSent ? undefined : undefined}
                  autoComplete="tel"
                />
              </div>

              {codeSent && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="code" className="text-sm font-medium">
                      Код из SMS
                    </label>
                    {attemptsRemaining < 3 && attemptsRemaining > 0 && (
                      <span className="text-xs text-amber-600">
                        Осталось попыток: {attemptsRemaining}
                      </span>
                    )}
                  </div>
                  <Input
                    ref={codeInputRef}
                    id="code"
                    type="text"
                    inputMode="numeric"
                    value={code}
                    onChange={e => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setCode(value);
                    }}
                    required
                    placeholder="123456"
                    maxLength={6}
                    disabled={isLoading}
                    className="font-mono text-lg tracking-widest text-center"
                    autoComplete="one-time-code"
                  />

                  {/* Resend code link */}
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setCodeSent(false);
                        setCode('');
                        setSmsError('');
                        setCountdown(0);
                      }}
                      className="text-sm text-gray-500 hover:text-gray-700"
                      disabled={isLoading}
                    >
                      Изменить номер
                    </button>

                    {countdown > 0 ? (
                      <span className="text-sm text-gray-500">
                        Отправить повторно через {countdown} сек
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={sendCode}
                        disabled={isSendingCode}
                        className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                      >
                        {isSendingCode ? 'Отправка...' : 'Отправить повторно'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading || isSendingCode}>
                {isLoading
                  ? 'Вход...'
                  : isSendingCode
                    ? 'Отправка...'
                    : codeSent
                      ? 'Подтвердить'
                      : 'Получить код'}
              </Button>

              {codeSent && (
                <p className="text-xs text-gray-500 text-center">Код действителен 5 минут</p>
              )}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
