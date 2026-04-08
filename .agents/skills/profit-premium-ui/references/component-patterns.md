# Component Architecture Patterns

Common patterns for different component types in Profit-Premium.

## Base UI Component Pattern

For components in `src/components/ui/`:

```typescript
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  // Additional props specific to component
}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(
          'base-classes',
          className
        )}
        {...props}
      />
    );
  }
);
Component.displayName = 'Component';

export { Component };
```

## Component with Variants (using cva)

```typescript
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const componentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-input bg-background',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Component.displayName = 'Component';

export { Component, componentVariants };
```

## Compound Component Pattern

```typescript
import * as React from 'react';
import { cn } from '@/lib/utils';

// Main component
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
      {...props}
    />
  )
);
Card.displayName = 'Card';

// Sub-components
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardContent };
```

## Client Component Pattern

For interactive components requiring React state:

```typescript
'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ClientComponentProps {
  // Props
}

export function ClientComponent({ ...props }: ClientComponentProps) {
  const [state, setState] = useState(defaultValue);

  const handleAction = useCallback(() => {
    // Action
  }, [/* deps */]);

  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

## Form Component Pattern

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface FormData {
  field1: string;
  field2: string;
}

export function FormComponent() {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    field1: '',
    field2: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showToast('Успешно!', 'success');
        setFormData({ field1: '', field2: '' });
      } else {
        showToast('Ошибка', 'error');
      }
    } catch {
      showToast('Ошибка сети', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Label *</label>
        <Input
          value={formData.field1}
          onChange={e => setFormData({ ...formData, field1: e.target.value })}
          required
          placeholder="Placeholder"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </Button>
    </form>
  );
}
```

## Navigation Component Pattern

```typescript
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { IconName } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/materials', label: 'Материалы', icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
```

## Server Component Pattern

For data fetching components:

```typescript
import { prisma } from '@/lib/prisma';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default async function DataList() {
  const items = await prisma.model.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="grid gap-4">
      {items.map(item => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
```

## Card with Image Pattern

```typescript
import { cn } from '@/lib/utils';

interface ImageCardProps {
  imageUrl: string;
  title: string;
  badges?: string[];
}

export function ImageCard({ imageUrl, title, badges }: ImageCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-1">{title}</h3>
        {badges && (
          <div className="flex gap-2 text-xs text-muted-foreground">
            {badges.map(badge => (
              <span key={badge} className="bg-muted px-2 py-1 rounded">
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

## Story Card Pattern

```typescript
interface StoryCardProps {
  imageUrl: string;
  title: string;
  link?: string;
}

export function StoryCard({ imageUrl, title, link }: StoryCardProps) {
  return (
    <a
      href={link || '#'}
      className="flex-shrink-0 w-48 h-64 rounded-lg overflow-hidden relative group"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-medium text-sm">{title}</p>
      </div>
    </a>
  );
}
```

## Filter Chip Pattern

```typescript
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface FilterChipProps {
  label: string;
  href: string;
  isActive: boolean;
}

export function FilterChip({ label, href, isActive }: FilterChipProps) {
  return (
    <Link
      href={href}
      className={cn(
        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground hover:bg-muted/80'
      )}
    >
      {label}
    </Link>
  );
}
```

## Modal/Dialog Pattern

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            ✕
          </Button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
```

## Toast Hook Pattern

```typescript
'use client';

import { useToast } from '@/components/ui/use-toast';

export function MyComponent() {
  const { showToast } = useToast();

  const handleAction = () => {
    showToast('Операция выполнена', 'success');
    // or
    showToast('Произошла ошибка', 'error');
    // or
    showToast('Информация', 'info');
  };

  return <Button onClick={handleAction}>Action</Button>;
}
```

## Loading State Pattern

```typescript
interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export function LoadingButton({ isLoading, children }: LoadingButtonProps) {
  return (
    <Button disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Загрузка...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
```

## Error State Pattern

```typescript
interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <p className="mt-1 text-sm text-red-500" role="alert">
      {message}
    </p>
  );
}
```

## Empty State Pattern

```typescript
interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="p-8 border-2 border-dashed rounded-lg text-center">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
```
