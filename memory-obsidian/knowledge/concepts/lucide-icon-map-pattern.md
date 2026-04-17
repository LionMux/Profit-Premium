---
title: "Паттерн iconMap для Lucide в Next.js"
category: concepts
created: 2026-04-17
updated: 2026-04-17
tags: [nextjs, react, lucide, icons, pattern, client-components]
sources: ["daily/2026-04-17"]
---

# Паттерн iconMap для Lucide в Next.js App Router

Паттерн для безопасной передачи иконок из Server Components в Client Components в Next.js 14+ App Router.

## Проблема

Lucide-иконки — это React-компоненты (функции). Их нельзя передавать как пропы через границу Server→Client Component, потому что функции не сериализуются.

## Решение

### 1. Определить iconMap внутри Client Component

```tsx
'use client';
import { FileText, Users, Building2, LayoutGrid } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  fileText: FileText,
  users: Users,
  building2: Building2,
  layoutGrid: LayoutGrid,
  // ... все используемые иконки
};
```

### 2. Принимать строковый идентификатор

```tsx
interface Props {
  icon: string;  // название из iconMap
}

export function MyComponent({ icon }: Props) {
  const Icon = iconMap[icon] || FileText;  // fallback
  return <Icon className="h-5 w-5" />;
}
```

### 3. Передавать строку из Server Component

```tsx
// Server Component — без 'use client'
<MyComponent icon="fileText" />
```

## Преимущества

- **Безопасность:** строки сериализуются без проблем
- **Типобезопасность:** можно расширить до union-type: `icon: 'fileText' | 'users' | ...`
- **Переиспользование:** один iconMap на весь проект или отдельные для доменов

## Альтернативы

- Динамический импорт `next/dynamic` — избыточно для иконок
- SVG inline — теряем преимущества Lucide (tree-shaking, консистентность)
- Отдельный client-only wrapper — создаёт лишний слой компонентов

## Связи

- [[concepts/nextjs-server-client-boundary]] — почему возникает проблема
- [[connections/merge-problems-and-solutions]] — применение в реальном проекте
