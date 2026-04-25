---
title: "Переход с Unsplash на локальные изображения"
category: concepts
created: 2026-04-23
updated: 2026-04-23
tags: [images, nextjs, unsplash, local, optimization, performance]
sources: ["daily/2026-04-23"]
---

# Переход с Unsplash на локальные изображения

## Проблема

Использование внешних URL (`images.unsplash.com`) в компонентах Next.js `<Image>` приводит к:
1. **Таймаутам** — Next.js пытается оптимизировать изображения через `/_next/image`, запросы к Unsplash иногда не проходят
2. **Падениям страниц** — `ConnectTimeoutError` на `images.unsplash.com:443` вызывает ошибку рендеринга
3. **Зависанию состояния** — пользователю приходится чистить куки, чтобы восстановить работу

## Что заменено

| Компонент | Было | Стало |
|-----------|------|-------|
| `adminGallery` (3 картинки) | Unsplash URL | `/stories/admin-gallery-{1-3}.jpg` |
| `fallbackStories` (4 картинки) | Unsplash URL | `/stories/fallback-{1-4}.jpg` |
| Сторис в БД (6 картинок) | Unsplash URL | `/stories/story{1-6}.jpg` |

## Настройка Next.js

```js
// next.config.js
images: {
  unoptimized: true,
}
```

Отключение оптимизации изображений убирает промежуточный слой `/_next/image` — картинки отдаются напрямую из `public/`.

## Seed-изображения

Placeholder-файлы для seed-данных:
- `public/uploads/thumb1.jpg`, `thumb2.jpg`
- `public/uploads/sample1.pdf`, `sample2.pdf`

Файлы создаются скриптами (`scripts/seed-stories.ts`) или копируются из `public/stories/`.

## Правило

> Никогда не использовать внешние URL для изображений в production-коде. Все ассеты должны быть локальными в `public/`. Если нужны внешние картинки — загружать их в `public/` при сборке.
