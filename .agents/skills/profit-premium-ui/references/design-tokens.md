# Design Tokens

Complete design system specifications for Profit-Premium.

## Color Palette

### Primary Colors (Burgundy)

| Token | Value | Usage |
|-------|-------|-------|
| `burgundy-dark` | `#3D1220` | Main content background |
| `burgundy` | `#5C1E2D` | Primary brand color, active states |
| `burgundy-medium` | `#7A2B3E` | Hover states, secondary elements |
| `burgundy-light` | `#9B4458` | Light accents, icons |

### Secondary Colors (Cream)

| Token | Value | Usage |
|-------|-------|-------|
| `cream` | `#F0EAE0` | Sidebar background, cards |
| `cream-dark` | `#E0D5C5` | Hover states, borders |
| `cream-light` | `#F8F4EF` | Light backgrounds |

### Accent Colors (Gold - for Login)

| Token | Value | Usage |
|-------|-------|-------|
| `gold` | `#C9A86C` | Login buttons, accents |
| `gold-light` | `#D4BC94` | Hover states |
| `dark-bg` | `#1a1a1a` | Login page background |

### Utility Colors

| Token | Value | Usage |
|-------|-------|-------|
| `white/5` | `rgba(255,255,255,0.05)` | Glass card backgrounds |
| `white/10` | `rgba(255,255,255,0.10)` | Subtle borders |
| `white/20` | `rgba(255,255,255,0.20)` | Input borders |
| `white/70` | `rgba(255,255,255,0.70)` | Secondary text on dark |

## Typography

### Font Families

```css
--font-serif: 'Cormorant', Georgia, serif;    /* Headings */
--font-sans: 'Inter', system-ui, sans-serif;  /* Body text */
```

### Type Scale

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H1 | 48-72px | 600 | 1.0 | Page titles |
| H2 | 32-48px | 600 | 1.1 | Section headings |
| H3 | 24-32px | 600 | 1.2 | Card titles |
| Body | 14-16px | 400 | 1.6 | Paragraphs |
| Small | 12-14px | 400 | 1.5 | Labels, captions |
| Label | 12px | 500 | 1.0 | Tracking 0.1em uppercase |

### Typography Patterns

```tsx
// Page title
<h1 className="font-serif text-5xl lg:text-6xl font-semibold text-cream leading-none">
  Заголовок страницы
</h1>

// Section heading
<h2 className="font-serif text-3xl lg:text-4xl font-semibold text-cream mb-6">
  Раздел
</h2>

// Card title
<h3 className="font-serif text-xl font-semibold text-burgundy-dark">
  Название карточки
</h3>

// Uppercase label
<span className="text-xs font-medium tracking-[0.2em] uppercase text-cream-dark">
  Метка
</span>

// Body text on dark
<p className="text-sm text-cream/80 leading-relaxed">
  Текст на бордовом фоне
</p>

// Body text on light
<p className="text-sm text-burgundy-dark/80 leading-relaxed">
  Текст на кремовом фоне
</p>
```

## Spacing

### Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight gaps |
| `space-2` | 8px | Small gaps |
| `space-3` | 12px | Standard gaps |
| `space-4` | 16px | Component padding |
| `space-6` | 24px | Section gaps |
| `space-8` | 32px | Large sections |
| `space-10` | 40px | Page padding |
| `space-16` | 64px | Major sections |

### Common Patterns

```tsx
// Page padding
<div className="p-6 lg:p-10">

// Card padding
<div className="p-6">

// Section spacing
<section className="py-16">

// Component gap
<div className="space-y-6">

// Grid gap
<div className="grid gap-6">
```

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0 | Inputs, buttons (minimal style) |
| `sm` | 4px | Small elements |
| `DEFAULT` | 8px | Cards, containers |
| `lg` | 12px | Large cards |
| `full` | 9999px | Avatars, pills |

**Note**: Prefer minimal or no border radius for premium aesthetic.

## Shadows

```css
/* Subtle shadow for cards on dark */
shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

/* Glass effect */
backdrop-blur: blur(8px);
```

## Z-Index Scale

| Layer | Z-Index | Usage |
|-------|---------|-------|
| Base | 0 | Content |
| Sidebar | 40 | Fixed sidebar |
| Modal overlay | 50 | Dialog backdrop |
| Modal content | 60 | Dialog content |
| Toast | 100 | Notifications |

## Animation

### Transitions

```css
/* Standard transition */
transition: all 0.2s ease-out;

/* Button hover */
transition: colors 0.2s, background-color 0.2s;
```

### Durations

| Duration | Usage |
|----------|-------|
| 150ms | Micro-interactions |
| 200ms | Standard transitions |
| 300ms | Page transitions |
| 500ms | Complex animations |

## Tailwind Configuration

Reference from `tailwind.config.ts`:

```typescript
colors: {
  burgundy: {
    DEFAULT: '#5C1E2D',
    dark: '#3D1220',
    medium: '#7A2B3E',
    light: '#9B4458',
  },
  cream: {
    DEFAULT: '#F0EAE0',
    dark: '#E0D5C5',
    light: '#F8F4EF',
  },
},
fontFamily: {
  sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
  serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
},
```
