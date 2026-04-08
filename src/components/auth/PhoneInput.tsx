'use client';

import React, { forwardRef, useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

/**
 * PhoneInput - Masked input for Russian phone numbers
 * Format: +7 (999) 999-99-99
 */
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, error, className, disabled, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    // Format phone number to mask format
    const formatPhone = useCallback((input: string): string => {
      const digits = input.replace(/\D/g, '');

      // Remove leading 7 or 8 if present to normalize
      let normalizedDigits = digits;
      if (normalizedDigits.startsWith('7') || normalizedDigits.startsWith('8')) {
        normalizedDigits = normalizedDigits.slice(1);
      }

      // Limit to 10 digits
      normalizedDigits = normalizedDigits.slice(0, 10);

      let formatted = '+7';

      if (normalizedDigits.length > 0) {
        formatted += ` (${normalizedDigits.slice(0, 3)}`;
      }
      if (normalizedDigits.length >= 3) {
        formatted += `) ${normalizedDigits.slice(3, 6)}`;
      }
      if (normalizedDigits.length >= 6) {
        formatted += `-${normalizedDigits.slice(6, 8)}`;
      }
      if (normalizedDigits.length >= 8) {
        formatted += `-${normalizedDigits.slice(8, 10)}`;
      }

      return formatted;
    }, []);

    // Extract raw digits from formatted phone
    const extractDigits = useCallback((formatted: string): string => {
      const digits = formatted.replace(/\D/g, '');
      // Ensure starts with 7
      if (!digits.startsWith('7')) {
        return '7' + digits;
      }
      return digits;
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      const formatted = formatPhone(input);

      // Only update if valid characters
      if (/^[\d\s\+\(\)\-]*$/.test(input)) {
        onChange(formatted);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      // If empty, add +7 prefix
      if (!value || value === '') {
        onChange('+7');
      }
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      // If only +7 remains, clear it
      if (value === '+7' || value === '+7 (') {
        onChange('');
      }
      props.onBlur?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Prevent deletion of +7 prefix
      if ((e.key === 'Backspace' || e.key === 'Delete') && value.length <= 2) {
        e.preventDefault();
      }
      props.onKeyDown?.(e);
    };

    // Calculate if phone is complete (10 digits after +7)
    const digits = value.replace(/\D/g, '');
    const isComplete = digits.length === 11; // 7 + 10 digits

    return (
      <div className="relative">
        <Input
          ref={ref}
          type="tel"
          inputMode="tel"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="+7 (999) 999-99-99"
          className={cn(
            'font-mono text-base',
            isComplete && !error && 'border-green-500 focus-visible:ring-green-500',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? 'phone-error' : undefined}
          autoComplete="tel"
          maxLength={18}
          {...props}
        />
        {isComplete && !error && !isFocused && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
        {error && (
          <p id="phone-error" className="mt-1 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
