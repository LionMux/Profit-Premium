---
title: "Архитектура API для Stories"
category: concepts
created: 2026-04-23
updated: 2026-04-23
tags: [api, nextjs, stories, crud, admin, prisma]
sources: ["daily/2026-04-23"]
---

# Архитектура API для Stories

## Роуты

| Метод | URL | Доступ | Описание |
|-------|-----|--------|----------|
| GET | `/api/stories` | Все | Список всех сторис (сортировка по `order asc`) |
| POST | `/api/stories` | ADMIN, MANAGER | Создание новой стори (автоинкремент `order`) |
| PATCH | `/api/stories/[id]` | ADMIN, MANAGER | Редактирование: title, link, isActive, order |
| DELETE | `/api/stories/[id]` | ADMIN, MANAGER | Удаление стори |

## Защита ролей

```ts
const user = await prisma.user.findUnique({
  where: { id: session.user.id },
  select: { role: true },
});

if (!user || (user.role !== 'ADMIN' && user.role !== 'MANAGER')) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
```

## Автоинкремент order

При создании новой стори поле `order` вычисляется автоматически:
```ts
const maxOrder = await prisma.story.aggregate({
  _max: { order: true },
});
// order = (maxOrder._max.order ?? 0) + 1
```

## Schema Prisma

```prisma
model Story {
  id        String   @id @default(uuid())
  imageUrl  String
  title     String
  link      String?
  order     Int      @default(0)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([isActive, order])
}
```

## Правило

> Все write-операции со Stories проходят через API и требуют роли ADMIN или MANAGER. Frontend (`StoriesManager`) вызывает `fetch()` и делает `window.location.reload()` при успехе.
