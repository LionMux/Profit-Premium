---
title: "Редизайн UI Profit-Premium"
category: concepts
created: 2026-04-17
updated: 2026-04-17
tags: [ui, redesign, profit-premium, nextjs, react]
sources: ["daily/2026-04-17"]
---

# Редизайн UI Profit-Premium

Комплексное обновление визуального стиля личного кабинета партнёра. Все страницы кабинета переписаны в едином стиле лэндинга: бордовая/кремовая палитра, шрифт Cormorant для заголовков, премиальный элегантный дизайн.

## Новые компоненты

### Dashboard
- [[concepts/welcome-section]] — адаптивное приветствие по времени суток
- [[concepts/quick-action-card]] — карточки быстрых действий с hover-эффектами
- Обновлённая карусель сторис с пагинацией и автоплеем

### Admin
- [[concepts/stories-manager]] — CRUD для сторис
- [[concepts/stat-card]] — карточки статистики с count-up анимацией
- [[concepts/upload-material-card]] — диалог загрузки материалов

### Profile
- [[concepts/transfer-client-dialog]] — диалог передачи клиента в CRM

## Обновлённые компоненты

| Компонент | Изменения |
|-----------|-----------|
| StoriesCarousel | Пагинация точками, автоплей 5с, drag/swipe, стрелки |
| MaterialCard | Новый дизайн, hover-эффекты, бейджи города/типа |
| Footer | Контакты, навигация, соцсети (Telegram, WhatsApp, VK) |
| globals.css | fadeIn, fadeInUp, shimmer, pulse-soft, hover-lift, glass |

## Обновлённые страницы

- `src/app/(dashboard)/dashboard/page.tsx` — WelcomeSection + QuickActionCards + CTA
- `src/app/(dashboard)/materials/page.tsx` — статистика в заголовке, улучшенные фильтры
- `src/app/(dashboard)/profile/page.tsx` — карточка пользователя, быстрые действия
- `src/app/(dashboard)/contacts/page.tsx` — 4 карточки: юридическая инфо, контакты, банк-реквизиты, дополнительно
- `src/app/(dashboard)/layout.tsx` — бордовый фон, градиентные декорации
- `src/app/admin/page.tsx` — независимый layout, статистика, StoriesManager, инструкции

## Требующие реализации API

```
POST   /api/stories
PATCH  /api/stories/:id
DELETE /api/stories/:id
POST   /api/materials
POST   /api/transfer-client
```

## Связи

- [[connections/merge-problems-and-solutions]] — проблемы, возникшие при переносе
- [[concepts/nextjs-server-client-boundary]] — ограничения App Router
