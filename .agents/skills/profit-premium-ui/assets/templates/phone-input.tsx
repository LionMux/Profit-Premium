/**
 * Phone Input Component (Masked)
 * Use for: Phone number input with Russian format
 * Location: src/components/auth/PhoneInput.tsx
 * 
 * Features:
 * - Mask +7 (999) 999-99-99
 * - Validation support
 * - Accessible
 */

'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import InputMask from 'react-input-mask';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <InputMask
          mask="+7 (999) 999-99-99"
          maskChar="_"
          {...props}
        >
          {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
            <input
              {...inputProps}
              ref={ref}
              type="tel"
              className={cn(
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2',
                'text-sm ring-offset-background file:border-0 file:bg-transparent',
                'file:text-sm file:font-medium placeholder:text-muted-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                error && 'border-red-500 focus-visible:ring-red-500',
                className
              )}
            />
          )}
        </InputMask>
        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';
