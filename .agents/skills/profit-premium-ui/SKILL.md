---
name: profit-premium-ui
description: Generate production-ready UI components for Profit-Premium real estate partner portal. This skill provides design system tokens, component patterns, and code templates for creating pages and components in the burgundy-cream aesthetic with right-sidebar layout. Use when creating auth pages, admin panels, material cards, Stories carousels, or any UI that must match the Profit-Premium brand identity.
---

# Profit-Premium UI Skill

Design system and component patterns for Profit-Premium real estate partner portal.

## Brand Identity

**Profit-Premium** — закрытый личный кабинет для партнеров-агентов по недвижимости. Premium aesthetic with burgundy-cream color palette, elegant serif typography, and right-sidebar navigation.

### Core Visual Language

- **Colors**: Deep burgundy (#3D1220, #5C1E2D) paired with warm cream (#F0EAE0, #E0D5C5)
- **Typography**: Cormorant serif for headings, Inter sans-serif for body
- **Layout**: Right sidebar navigation, burgundy main content area
- **Style**: Minimal borders, subtle shadows, generous whitespace, premium feel

## Quick Start

### Page Structure Template

```tsx
// Admin/Profile page layout
<div className="min-h-screen flex flex-col lg:flex-row">
  {/* Main Content - Burgundy Background */}
  <div className="flex-1 flex flex-col min-h-screen bg-burgundy-dark">
    <main className="flex-1 p-6 lg:p-10">{/* Page content */}</main>
    <Footer />
  </div>

  {/* Right Sidebar - Cream Background */}
  <Sidebar user={user} />
</div>
```

### Login Page Structure

```tsx
// Split-screen login (Image1 style)
<div className="min-h-screen flex">
  {/* Left - Dark form panel */}
  <div className="w-full lg:w-1/2 bg-[#1a1a1a] flex flex-col justify-center px-8 lg:px-16">
    <Logo variant="gold" />
    <h1 className="font-serif text-cream text-3xl">Вход в личный кабинет</h1>
    <LoginForm />
  </div>

  {/* Right - Visual panel */}
  <div className="hidden lg:block w-1/2 bg-gradient-to-br from-[#C9A86C] to-[#E0D5C5]">
    {/* 3D city visualization or abstract pattern */}
  </div>
</div>
```

## Design Tokens

Read [references/design-tokens.md](references/design-tokens.md) for complete color palette, typography scale, spacing, and border radius specifications.

## Component Patterns

Read [references/component-patterns.md](references/component-patterns.md) for:

- Stories carousel implementation
- Material cards with PDF previews
- Filter bars and drawers
- Form layouts
- Navigation patterns

## Page Templates

Read [references/page-templates.md](references/page-templates.md) for:

- Login page (split-screen)
- Admin dashboard with Stories
- Profile page layout
- Materials listing with filters

## Image References

When user references design images:

- **Image1**: Split-screen login with dark left panel, gold accents
- **Image2**: Admin panel with Stories carousel, cream cards on burgundy

Always check `images/` folder in project root for reference images.

## Technology Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- next-auth for authentication

## File Locations

```
src/
├── app/
│   ├── (auth)/login/page.tsx       # Login page
│   ├── (dashboard)/                # Authenticated routes
│   │   ├── dashboard/page.tsx      # Homepage with Stories
│   │   ├── profile/page.tsx        # Profile page
│   │   └── materials/page.tsx      # Materials listing
│   └── admin/page.tsx              # Admin panel
├── components/
│   ├── layout/Sidebar.tsx          # Right sidebar nav
│   ├── layout/Footer.tsx           # Footer component
│   └── stories/StoriesCarousel.tsx # Stories component
└── styles/globals.css              # Global styles + CSS vars
```

## Implementation Notes

1. **Sidebar**: Always on right (lg:order-last), cream background
2. **Footer**: Inside burgundy area, before sidebar
3. **Stories**: Horizontal scroll, snap points, cream cards
4. **Auth**: Use next-auth credentials provider
5. **Forms**: White inputs on dark backgrounds, cream buttons
6. **Cards**: Minimal borders, subtle backdrop-blur for glass effect

## Common Tasks

### Create new admin page

1. Use `bg-burgundy-dark` for main background
2. Add `StoriesCarousel` at top
3. Use cream cards for content blocks
4. Include standard `Sidebar` and `Footer`

### Update login page

1. Split-screen layout
2. Dark (#1a1a1a) left panel
3. Gold/cream accent colors
4. Serif headings
5. Tabbed auth (Email/SMS)

### Add new card component

1. Background: `bg-cream` or `bg-white/5 backdrop-blur`
2. Border: `border-white/10` (subtle) or none
3. Padding: `p-6` or `p-8`
4. Border radius: minimal or `rounded-lg`

## Do's and Don'ts

**Do:**

- Use serif font (font-serif) for all headings
- Maintain high contrast (cream on burgundy)
- Use generous padding and whitespace
- Keep sidebar consistently on the right

**Don't:**

- Use bright colors (stick to burgundy/cream palette)
- Move sidebar to left
- Use heavy shadows or borders
- Mix multiple border radius styles
