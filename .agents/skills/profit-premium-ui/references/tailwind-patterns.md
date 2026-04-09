# Tailwind CSS Patterns

Common Tailwind class combinations used in Profit-Premium.

## Layout Patterns

### Flexbox
```
flex items-center justify-between gap-4
flex flex-col space-y-4
flex items-center gap-3
flex-shrink-0
flex-1
```

### Grid
```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
grid grid-cols-2 gap-4
```

### Spacing
```
space-y-4 space-y-6 space-y-8
space-x-2 space-x-4
gap-2 gap-4 gap-6
gap-x-4 gap-y-6
```

### Padding & Margin
```
p-4 p-6 p-8
px-4 py-2 px-4 py-3 px-6 py-3
pt-4 pb-4
m-4 mx-auto
mb-4 mb-6 mb-8
```

## Component Patterns

### Card
```
rounded-lg border bg-card text-card-foreground shadow-sm
hover:shadow-lg transition-shadow
```

### Button Base
```
inline-flex items-center justify-center whitespace-nowrap 
rounded-md text-sm font-medium 
ring-offset-background 
transition-colors
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
disabled:pointer-events-none disabled:opacity-50
```

### Button Variants
```
/* Primary */
bg-primary text-primary-foreground hover:bg-primary/90

/* Secondary */
bg-secondary text-secondary-foreground hover:bg-secondary/80

/* Outline */
border border-input bg-background hover:bg-accent hover:text-accent-foreground

/* Ghost */
hover:bg-accent hover:text-accent-foreground

/* Destructive */
bg-destructive text-destructive-foreground hover:bg-destructive/90
```

### Button Sizes
```
/* Default */
h-10 px-4 py-2

/* Small */
h-9 rounded-md px-3

/* Large */
h-11 rounded-md px-8

/* Icon */
h-10 w-10
```

### Input
```
flex h-10 w-full rounded-md border border-input bg-background 
px-3 py-2 text-sm ring-offset-background 
file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground 
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
disabled:cursor-not-allowed disabled:opacity-50
```

### Navigation Links
```
/* Active */
bg-primary text-primary-foreground

/* Inactive */
hover:bg-muted text-muted-foreground hover:text-foreground

/* With transition */
transition-colors
```

## Background Patterns

### Page Background
```
bg-background min-h-screen
```

### Card Background
```
bg-card rounded-lg border shadow-sm
```

### Muted/Section Background
```
bg-muted
```

### Accent Background
```
bg-accent text-accent-foreground
```

## Text Patterns

### Headings
```
text-3xl font-bold tracking-tight
text-2xl font-semibold tracking-tight
text-xl font-semibold
text-lg font-medium
text-base font-medium
```

### Body Text
```
text-base
text-sm text-muted-foreground
text-xs text-muted-foreground
```

## Border Patterns

### Default Border
```
border border-border
```

### Input Border
```
border-input
```

### Dashed Border (Empty States)
```
border-2 border-dashed rounded-lg
```

### Top/Bottom Borders
```
border-t border-border
border-b border-border
```

## Interactive States

### Hover
```
hover:bg-accent hover:text-accent-foreground
hover:shadow-lg
hover:scale-105
hover:underline
hover:opacity-80
```

### Focus
```
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
```

### Disabled
```
disabled:pointer-events-none disabled:opacity-50
disabled:cursor-not-allowed
```

### Active/Current
```
bg-primary text-primary-foreground
```

## Image Patterns

### Responsive Image
```
w-full h-full object-cover
```

### Aspect Ratios
```
aspect-video
aspect-square
aspect-[3/4]
```

### Image Container
```
relative overflow-hidden
```

## Overlay Patterns

### Gradient Overlay
```
absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
```

### Solid Overlay
```
absolute inset-0 bg-black/50
```

### Positioning
```
absolute inset-0
absolute bottom-0 left-0 right-0
absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
fixed inset-0
```

## Animation Patterns

### Transitions
```
transition-colors
transition-shadow
transition-transform
transition-all duration-200
```

### Transform
```
transform hover:scale-105
group-hover:scale-105
```

### Shadcn Animations (requires tailwindcss-animate)
```
animate-in
slide-in-from-bottom-2
fade-in
```

## Form Patterns

### Form Container
```
space-y-4
```

### Form Field
```
space-y-1
```

### Label
```
text-sm font-medium
```

### Error Message
```
text-sm text-red-500 mt-1
```

### Success State
```
border-green-500 focus-visible:ring-green-500
text-green-600 bg-green-50
```

### Error State
```
border-red-500 focus-visible:ring-red-500
text-red-500 bg-red-50
```

## Responsive Patterns

### Mobile-First Grid
```
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

### Responsive Padding
```
p-4 md:p-6 lg:p-8
```

### Responsive Text
```
text-lg md:text-xl lg:text-2xl
```

### Hide/Show
```
hidden md:block
md:hidden
```

## Overflow Patterns

### Scroll Container
```
overflow-x-auto pb-4
overflow-y-auto
```

### Hide Overflow
```
overflow-hidden
```

### Hide Scrollbar
```
scrollbar-hide
/* or */
[style*="scrollbar-width: none"]
```

## Z-Index Patterns

```
z-10  /* Above content */
z-50  /* Modals, toasts */
```

## Shadow Patterns

```
shadow-sm
shadow
shadow-lg
hover:shadow-lg
```

## Width/Height Patterns

### Full Size
```
w-full h-full
min-h-screen
min-h-[calc(100vh-4rem)]
```

### Fixed Sizes
```
w-64
w-48 h-64
h-10
```

## Snap Scroll (for Stories)

```
scroll-snap-type-x-mandatory
scroll-snap-align-start
```
