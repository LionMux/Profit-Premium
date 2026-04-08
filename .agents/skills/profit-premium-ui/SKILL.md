---
name: profit-premium-ui
description: Generate UI components matching the Profit-Premium project design system. Use when creating new React components for this Next.js 14 real estate partner portal with shadcn/ui patterns. Supports base UI components (Button, Card, Input), layout components (Sidebar, Header), form components, and business-specific components (MaterialCard, StoryCard, FilterBar). Triggers on requests like "create component", "add UI", "button", "card", "dialog", "form", "MaterialCard", "StoryCard", or "ui component".
---

# Profit-Premium UI Components

Generate UI components that match the Profit-Premium project design system.

## Quick Start

1. Identify component type (base UI, layout, form, or business)
2. Use appropriate template from `assets/templates/`
3. Apply correct imports: `@/lib/utils`, `@/components/ui/*`
4. Use Tailwind classes from design system
5. Handle refs with `React.forwardRef` for base components

## Component Types

### Base UI Components

Located in `src/components/ui/`. Use shadcn/ui patterns:

- `React.forwardRef` for ref forwarding
- `cn()` from `@/lib/utils` for conditional classes
- `class-variance-authority` (cva) for variants
- Radix UI primitives when needed
- Compound component pattern (Card.Header, Card.Title, etc.)

### Layout Components

Located in `src/components/layout/`. Use client components:

- `'use client'` directive
- Lucide React icons
- Next.js `Link` for navigation
- Active state via `usePathname()`

### Form Components

Located in `src/components/` (feature-based folders). Patterns:

- React `useState` for form state
- Base `Input` and `Button` from UI kit
- Server validation via API routes
- Toast notifications via `useToast()`

### Business Components

Located in `src/components/[feature]/`. Patterns:

- Server Components for data fetching
- Client Components for interactivity
- Filter chips with active/inactive states

## CSS Variables (HSL format)

Always use these CSS custom properties:

```css
--background: 0 0% 100% --foreground: 240 10% 3.9% --card: 0 0% 100% --card-foreground: 240 10% 3.9%
  --popover: 0 0% 100% --popover-foreground: 240 10% 3.9% --primary: 240 5.9% 10%
  --primary-foreground: 0 0% 98% --secondary: 240 4.8% 95.9% --secondary-foreground: 240 5.9% 10%
  --muted: 240 4.8% 95.9% --muted-foreground: 240 3.8% 46.1% --accent: 240 4.8% 95.9%
  --accent-foreground: 240 5.9% 10% --destructive: 0 84.2% 60.2% --destructive-foreground: 0 0% 98%
  --border: 240 5.9% 90% --input: 240 5.9% 90% --ring: 240 5.9% 10% --radius: 0.5rem;
```

## Common Tailwind Patterns

### Backgrounds

- `bg-background` - main background
- `bg-card` - card background
- `bg-muted` - subtle background
- `bg-accent` - accent background
- `bg-primary` - primary action background
- `bg-secondary` - secondary background

### Text

- `text-foreground` - main text
- `text-muted-foreground` - secondary text
- `text-primary` - primary text
- `text-primary-foreground` - on primary background
- `text-destructive` - error text

### Interactive States

- `hover:bg-accent hover:text-accent-foreground`
- `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`
- `disabled:pointer-events-none disabled:opacity-50`

### Layout

- `flex items-center justify-between`
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- `space-y-4` / `gap-4`
- `p-4 px-6 py-3`

### Borders & Radius

- `border border-border`
- `rounded-lg` (0.5rem), `rounded-md`, `rounded-sm`

## File Templates

See `assets/templates/` for starting points:

- `base-component.tsx` - shadcn/ui style with forwardRef
- `client-component.tsx` - 'use client' with state
- `form-component.tsx` - form with validation
- `business-component.tsx` - feature-specific component

## Import Patterns

```typescript
// Utils
import { cn } from '@/lib/utils';

// UI components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Icons
import { IconName } from 'lucide-react';

// Next.js
import Link from 'next/link';
import { usePathname } from 'next/navigation';
```

## Common Component Patterns

### Button with variants

See existing `button.tsx` - use `cva` for variants: default, destructive, outline, secondary, ghost, link.

### Card compound pattern

```typescript
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)} {...props} />
  )
);
Card.displayName = 'Card';

// Sub-components: CardHeader, CardTitle, CardDescription, CardContent, CardFooter
```

### Form with validation

```typescript
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function FormComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ field: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    // API call...
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={formData.field}
        onChange={e => setFormData({ ...formData, field: e.target.value })}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </Button>
    </form>
  );
}
```

### Navigation with active state

```typescript
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        'px-4 py-2 rounded-lg transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-muted text-muted-foreground'
      )}
    >
      {children}
    </Link>
  );
}
```

## Business-Specific Components

### MaterialCard

Card for real estate materials with:

- Thumbnail image (aspect-video)
- Title and description
- City and property type badges
- Download link

### StoryCard

Horizontal scroll story card with:

- Background image
- Gradient overlay
- Title on overlay
- Hover scale effect

### FilterBar

Filter chips with:

- Active/inactive states
- Query param synchronization
- Horizontal scroll on mobile

### TransferClientForm

Client lead form with:

- Full name, phone, city fields
- Comment textarea
- Submit to API
- Toast notifications

## Accessibility Requirements

- Use `React.forwardRef` for ref forwarding
- Include `displayName` for debugging
- Use semantic HTML elements
- Add `aria-label` for icon-only buttons
- Support keyboard navigation
- Use `focus-visible` for focus states

## Validation Checklist

Before completing component generation:

- [ ] Correct imports from `@/lib/utils` and `@/components/ui/*`
- [ ] Uses `cn()` for conditional classes
- [ ] Applies correct Tailwind classes from design system
- [ ] Handles refs properly with `forwardRef`
- [ ] Uses `'use client'` when needed (state, effects, browser APIs)
- [ ] Includes `displayName` for forwardRef components
- [ ] Follows file naming convention (PascalCase for components)
- [ ] Uses Russian text for user-facing labels
