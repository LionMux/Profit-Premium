---
title: "Проблемы и решения при мерже profit-premium-new"
category: connections
created: 2026-04-17
updated: 2026-04-17
tags: [merge, nextjs, profit-premium, troubleshooting, app-router]
sources: ["daily/2026-04-17"]
---

# Проблемы и решения при мерже profit-premium-new

Связь между проблемами, возникшими при переносе изменений из `profit-premium-new`, и их решениями.

## Проблема 1: Functions cannot be passed directly to Client Components

**Контекст:** После переноса компонентов и входа в админку (`/dashboard`) возникала runtime-ошибка.

**Корень:** В Server Components (`dashboard/page.tsx`, `admin/page.tsx`) иконки Lucide передавались как React-компоненты (функции) в Client Components (`QuickActionCard`, `StatCard`).

**Решение:** Перейти на паттерн [[concepts/lucide-icon-map-pattern]] — строковые названия + локальный `iconMap` внутри `'use client'` компонента.

**Файлы, где применено:**
- `src/components/dashboard/QuickActionCard.tsx`
- `src/components/admin/StatCard.tsx`
- `src/app/(dashboard)/dashboard/page.tsx`
- `src/app/admin/page.tsx`

## Проблема 2: Потеря контекста при копировании

**Корень:** `profit-premium-new` был рабочей копией с доработками, но без связи с основным репозиторием. При ручном копировании легко потерять зависимости или создать дубли.

**Решение:** Полный аудит CHANGES.md + сравнение файлов перед копированием. Все изменения перенесены файл-за-файлом.

## Итоговая структура изменений

| Тип | Количество |
|-----|-----------|
| Новые компоненты | 6 |
| Обновлённые компоненты | 4 |
| Обновлённые страницы | 6 |
| Обновлённые стили | 1 (globals.css) |

**Сборка:** `npm run build` — Compiled successfully

## Связи

- [[concepts/profit-premium-ui-redesign]] — что было перенесено
- [[concepts/nextjs-server-client-boundary]] — техническое ограничение
- [[concepts/lucide-icon-map-pattern]] — паттерн решения
