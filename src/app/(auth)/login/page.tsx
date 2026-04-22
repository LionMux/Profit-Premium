'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PhoneInput } from '@/components/auth/PhoneInput';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import {
  BuildingComplexIllustration,
  AbstractSkyline,
} from '@/components/illustrations/BuildingIllustrations';

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
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 bg-burgundy-dark flex flex-col justify-center px-8 lg:px-16 py-12 relative">
        {/* Logo */}
        <div className="absolute top-8 left-8 lg:left-16">
          <div className="text-cream font-serif">
            <div className="text-lg tracking-[0.3em] font-light">PROFIT</div>
            <div className="text-lg tracking-[0.4em] font-semibold">PREMIUM</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-md w-full mx-auto lg:mx-0">
          {/* Heading */}
          <h1 className="font-serif text-3xl lg:text-4xl text-cream font-semibold mb-10">
            Вход в личный кабинет
          </h1>

          {/* Auth Type Tabs */}
          <div className="flex gap-6 mb-8 border-b border-white/10">
            <button
              onClick={() => {
                handleAuthTypeChange('email');
                resetSmsForm();
              }}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                authType === 'email' ? 'text-cream' : 'text-cream/50 hover:text-cream/80'
              }`}
            >
              E-mail
              {authType === 'email' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cream" />
              )}
            </button>
            <button
              onClick={() => handleAuthTypeChange('sms')}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                authType === 'sms' ? 'text-cream' : 'text-cream/50 hover:text-cream/80'
              }`}
            >
              По СМС
              {authType === 'sms' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cream" />
              )}
            </button>
          </div>

          {authType === 'email' ? (
            // Email login form
            <form onSubmit={handleEmailSubmit} className="space-y-5">
              {emailError && (
                <div
                  className="p-3 text-sm text-red-300 bg-red-500/10 border border-red-500/20"
                  role="alert"
                >
                  {emailError}
                </div>
              )}

              <div>
                <label htmlFor="email" className="text-sm text-cream/80 mb-2 block">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="partner@example.com"
                  autoComplete="email"
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-white text-burgundy-dark placeholder:text-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-cream/50 transition-shadow "
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="text-sm text-cream/80">
                    Пароль
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-cream/60 hover:text-cream flex items-center gap-1 transition-colors"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="w-3 h-3" />
                        скрыть
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3" />
                        показать пароль
                      </>
                    )}
                  </button>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-white text-burgundy-dark placeholder:text-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-cream/50 transition-shadow "
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-cream text-burgundy-dark font-medium hover:bg-cream-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed "
              >
                {isLoading ? 'Вход...' : 'Войти'}
              </button>

              <label className="flex items-center gap-3 text-sm text-cream/80 cursor-pointer select-none group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border border-cream/40 transition-colors peer-checked:bg-cream peer-checked:border-cream flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-burgundy opacity-0 peer-checked:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                Запомнить меня
              </label>
            </form>
          ) : (
            // SMS login form
            <form onSubmit={handleSmsSubmit} className="space-y-5">
              {smsError && (
                <div
                  className="p-3 text-sm text-red-300 bg-red-500/10 border border-red-500/20"
                  role="alert"
                >
                  {smsError}
                </div>
              )}

              <div>
                <label htmlFor="phone" className="text-sm text-cream/80 mb-2 block">
                  Телефон
                </label>
                <PhoneInput
                  id="phone"
                  value={phone}
                  onChange={setPhone}
                  disabled={codeSent || isSendingCode}
                  autoComplete="tel"
                />
              </div>

              {codeSent && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="code" className="text-sm text-cream/80">
                      Код из SMS
                    </label>
                    {attemptsRemaining < 3 && attemptsRemaining > 0 && (
                      <span className="text-xs text-amber-400">
                        Осталось попыток: {attemptsRemaining}
                      </span>
                    )}
                  </div>
                  <input
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
                    className="w-full px-4 py-3 bg-white text-burgundy-dark placeholder:text-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-cream/50 transition-shadow font-mono text-lg tracking-widest text-center "
                    autoComplete="one-time-code"
                  />

                  {/* Resend code link */}
                  <div className="mt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setCodeSent(false);
                        setCode('');
                        setSmsError('');
                        setCountdown(0);
                      }}
                      className="text-sm text-cream/60 hover:text-cream transition-colors"
                      disabled={isLoading}
                    >
                      Изменить номер
                    </button>

                    {countdown > 0 ? (
                      <span className="text-sm text-cream/50">
                        Отправить повторно через {countdown} сек
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={sendCode}
                        disabled={isSendingCode}
                        className="text-sm text-cream hover:text-cream-light transition-colors disabled:text-cream/40"
                      >
                        {isSendingCode ? 'Отправка...' : 'Отправить повторно'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-cream text-burgundy-dark font-medium hover:bg-cream-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || isSendingCode}
              >
                {isLoading
                  ? 'Вход...'
                  : isSendingCode
                    ? 'Отправка...'
                    : codeSent
                      ? 'Подтвердить'
                      : 'Получить код'}
              </button>

              {codeSent && (
                <p className="text-xs text-cream/50 text-center">Код действителен 5 минут</p>
              )}
            </form>
          )}

          {/* Forgot password */}
          <div className="mt-6">
            <a
              href="#"
              className="text-sm text-cream/70 hover:text-cream transition-colors underline underline-offset-4"
            >
              Забыли пароль?
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-8 lg:left-16">
          <p className="text-xs text-cream/40">
            Эксперты в недвижимости <span className="text-cream/60">profitpremium.ru</span>
          </p>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex w-1/2 bg-cream relative overflow-hidden items-center justify-center">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream-dark/30 to-burgundy/20" />

        {/* Decorative skyline at bottom */}
        <div className="absolute bottom-0 left-0 right-0 opacity-20">
          <AbstractSkyline className="w-full h-48 text-burgundy" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-12">
          {/* Building Illustration */}
          <div className="w-48 h-60 mx-auto mb-8 relative">
            <BuildingComplexIllustration className="w-full h-full text-burgundy" />
          </div>

          {/* Text */}
          <h2 className="font-serif text-4xl text-burgundy-dark font-semibold mb-4">
            Profit Premium
          </h2>
          <p className="text-burgundy-dark/60 text-lg max-w-sm mx-auto leading-relaxed">
            Закрытый клуб для партнеров по недвижимости
          </p>

          {/* Decorative line */}
          <div className="mt-8 w-16 h-0.5 bg-burgundy/30 mx-auto" />

          {/* Features */}
          <div className="mt-8 space-y-2 text-sm text-burgundy-dark/50">
            <p>Эксклюзивные объекты</p>
            <p>Персональный менеджер</p>
            <p>Быстрое оформление сделок</p>
          </div>
        </div>

        {/* Top decorative skyline */}
        <div className="absolute top-0 left-0 right-0 opacity-10 rotate-180">
          <AbstractSkyline className="w-full h-32 text-burgundy" />
        </div>
      </div>
    </div>
  );
}
