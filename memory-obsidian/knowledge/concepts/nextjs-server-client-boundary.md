---
title: "Граница Server/Client Components в Next.js"
category: concepts
created: 2026-04-17
updated: 2026-04-17
tags: [nextjs, react, app-router, server-components, client-components, error]
sources: ["daily/2026-04-17"]
---

# Граница Server/Client Components в Next.js

В Next.js App Router существует строгое разделение между Server Components (SC) и Client Components (CC). Ошибки возникают, когда разработчик пытается передать из SC в CC объекты, которые нельзя сериализовать.

## Ошибка: Functions cannot be passed directly to Client Components

**Симптом:**
```
Warning: Only plain objects can be passed to Client Components from Server Components.
Error: Functions cannot be passed directly to Client Components
  {$$typeof: ..., render: function FileText}
```

**Причина:** Компоненты-иконки из `lucide-react` — это функции (React-компоненты). Их нельзя передать как проп из Server Component в Client Component, потому что Next.js сериализует пропы для передачи через границу SC→CC, а функции не сериализуются.

**Неправильный код:**
```tsx
// Server Component ❌
import { FileText } from 'lucide-react';
<QuickActionCard icon={FileText} ... />  // FileText — функция

// Client Component ❌
interface Props { icon: LucideIcon; }
export function QuickActionCard({ icon: Icon }) { ... }
```

## Правильное решение

Использовать строковые названия иконок + `iconMap` внутри `'use client'` компонента:

```tsx
// Client Component ✅
'use client';
import { FileText, Users, Building2 } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  fileText: FileText,
  users: Users,
  building2: Building2,
};

interface Props { icon: string; }
export function QuickActionCard({ icon }) {
  const Icon = iconMap[icon];
  return <Icon />;
}

// Server Component ✅
<QuickActionCard icon="fileText" ... />  // строка — сериализуется
```

## Правило

> Никогда не передавать импортированные компоненты Lucide (или любые функции/классы) из Server Components в Client Components. Всегда использовать строковые идентификаторы + локальный маппинг внутри `'use client'`.

## Связи

- [[concepts/lucide-icon-map-pattern]] — паттерн решения
- [[connections/merge-problems-and-solutions]] — контекст возникновения ошибки
