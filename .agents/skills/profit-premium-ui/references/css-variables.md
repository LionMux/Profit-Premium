# CSS Variables Reference

Profit-Premium uses CSS custom properties in HSL format for theming.

## Light Theme (Default)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 0.5rem;
}
```

## Dark Theme

```css
.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 240 10% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 240 3.7% 15.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;
}
```

## Usage in Tailwind

Use `hsl()` wrapper in Tailwind classes:

```css
.bg-background {
  background-color: hsl(var(--background));
}
.text-foreground {
  color: hsl(var(--foreground));
}
.border-border {
  border-color: hsl(var(--border));
}
```

## Variable Categories

### Background Colors

- `--background` - Page background
- `--card` - Card/panel background
- `--popover` - Dropdown/popover background
- `--muted` - Subtle background (hover states)
- `--accent` - Accent background (highlights)

### Foreground Colors

- `--foreground` - Main text
- `--card-foreground` - Text on cards
- `--popover-foreground` - Text in popovers
- `--muted-foreground` - Secondary/muted text
- `--accent-foreground` - Text on accent background

### Action Colors

- `--primary` - Primary button/action
- `--primary-foreground` - Text on primary
- `--secondary` - Secondary button
- `--secondary-foreground` - Text on secondary
- `--destructive` - Delete/danger actions
- `--destructive-foreground` - Text on destructive

### UI Elements

- `--border` - Border color
- `--input` - Input field borders
- `--ring` - Focus ring color
- `--radius` - Border radius base (0.5rem)

## Border Radius Values

- `rounded-sm`: calc(var(--radius) - 4px) = 0.125rem
- `rounded-md`: calc(var(--radius) - 2px) = 0.375rem
- `rounded-lg`: var(--radius) = 0.5rem
