# Profit-Premium UI Redesign Specification

## Executive Summary

Доведение UI внутренних страниц личного кабинета Profit-Premium до production-ready состояния с единой burgundy-cream дизайн-системой. Референс — лендинг проекта и макеты `images/image2.png` (dashboard) / `image4.png` (materials). Приоритет: dashboard + materials, затем profile + contacts + admin.

---

## Problem Statement

Текущий личный кабинет (/dashboard, /materials, /profile, /contacts, /admin) выглядит незавершённым и не соответствует premium-эстетике лендинга:

- Сломанные изображения в Stories-карусели
- Контрастные dark-карточки на бордовом фоне выбиваются из стиля
- Фильтры и карточки materials выглядят «по умолчанию»
- Отсутствует единая типографика и фирменный логотип в контентной зоне
- Футер тёмный, хотя на макете должен быть кремовым

---

## Success Criteria

1. Dashboard и Materials визуально соответствуют макетам image2/image4
2. Stories отображаются корректно (нет битых картинок)
3. Все страницы дашборда используют единую типографику (serif-заголовки, tracking-wide uppercase)
4. Адаптивность сохранена (mobile → desktop)
5. Не нарушена функциональность (фильтры, формы, API, next-auth)

---

## User Personas

- **Партнёры-агенты** — просматривают materials, передают клиентов, смотрят stories
- **Админы/менеджеры** — загружают материалы, управляют контентом

Оба сегмента ожидают премиальный, аккуратный интерфейс, соответствующий позиционированию бренда.

---

## User Journey (Core Flow)

1. Партнёр заходит на /dashboard
2. Видит логотип PROFIT PREMIUM сверху слева
3. Видит Stories в формате кремовых карточек
4. Переходит в /materials
5. Видит крупный serif-заголовок «МАТЕРИАЛЫ»
6. Выбирает фильтры (город / тип недвижимости) через кремовые pill-кнопки
7. Скачивает нужную презентацию

---

## Functional Requirements

### P0 — Must Have (Dashboard + Materials)

#### Dashboard (/dashboard)

- [ ] Добавить логотип `PROFIT PREMIUM` в верхний левый угол над контентом (serif, tracking-wide)
- [ ] Исправить баг отображения изображений в `StoriesCarousel`
  - Добавить fallback placeholder если `imageUrl` недоступен
  - Обработать ошибку загрузки `onError` для `<Image />`
- [ ] Переделать карточки Stories: кремовый фон (`bg-cream` или `bg-cream-dark`), rounded-2xl, без текста внутри
- [ ] Перенести заголовок «НОВОСТИ, СТАРТЫ ПРОДАЖ В ФОРМАТЕ СТОРИС» под карточки (tracking-widest uppercase)
- [ ] Убрать стрелки карусели или стилизовать их под макет
- [ ] Empty state оставить, но стилизовать под новый дизайн

#### Materials (/materials)

- [ ] Добавить логотип `PROFIT PREMIUM` в верхний левый угол
- [ ] Заголовок «МАТЕРИАЛЫ» — крупный serif (`text-4xl lg:text-5xl`), cream цвет
- [ ] Фильтры переделать в кремовые pill-кнопки с бордовым текстом как на image4
  - Активный фильтр: `bg-cream text-burgundy-dark`
  - Неактивный: `bg-transparent border border-cream/50 text-cream/80`
- [ ] Убрать фон «панели фильтров» (убрать `bg-white/5 backdrop-blur-sm` wrapper)
- [ ] Стилизовать `MaterialCard`:
  - Фон карточки: `bg-cream` или `bg-cream-dark`
  - Текст заголовка: `text-burgundy-dark`
  - Бейджи: кремовые/бордовые
  - Кнопка «Скачать» — бордовая или outline-burgundy

#### Layout-wide

- [ ] Переделать `Footer` в кремовый (`bg-cream`)
  - «КОНТАКТЫ» слева
  - «СОЦСЕТИ» справа
  - Текст и иконки в `text-burgundy-dark`
- [ ] Убедиться, что `Footer` корректно отображается внутри `bg-burgundy-dark` зоны

### P1 — Should Have (Profile + Contacts + Admin)

- [ ] **Profile** (/profile): добавить логотип, стилизовать карточки quick-actions под кремовый фон, профильную информацию — чёткие разделители
- [ ] **Contacts** (/contacts): добавить логотип, стилизовать информационные блоки под кремовые карточки с бордовым текстом
- [ ] **Admin** (/admin): добавить логотип, стилизовать stats-cards и action-cards под единый стиль

### P2 — Nice to Have

- [ ] Анимации hover-эффектов на кремовых карточках (subtle lift + shadow)
- [ ] Skeleton-загрузка для Stories и Materials
- [ ] Плавные page transitions

---

## Technical Architecture

### Data Model

Изменений не требуется. Используем существующие Prisma-модели:

- `Story` — imageUrl, title, link
- `Material` — title, description, fileUrl, thumbnailUrl, city, propertyType

### System Components

| Компонент                                    | Что меняется                                                       |
| -------------------------------------------- | ------------------------------------------------------------------ |
| `src/app/(dashboard)/dashboard/page.tsx`     | Добавить логотип, обновить layout Stories                          |
| `src/app/(dashboard)/materials/page.tsx`     | Добавить логотип, убрать wrapper фильтров, обновить заголовок      |
| `src/components/stories/StoriesCarousel.tsx` | Исправить баг с Image, кремовые карточки, перенести заголовок      |
| `src/components/materials/FilterBar.tsx`     | Кремовые pill-кнопки, убрать лейблы «Город:» / «Тип недвижимости:» |
| `src/components/materials/MaterialCard.tsx`  | Кремовый фон карточки, бордовый текст, стилизованные бейджи        |
| `src/components/layout/Footer.tsx`           | Кремовый фон, бордовый текст                                       |
| `src/components/layout/Sidebar.tsx`          | Минимальные правки если нужно (уже cream)                          |

### Image Bug Fix

В `StoriesCarousel` добавить:

```tsx
<Image
  src={story.imageUrl}
  alt={story.title}
  fill
  className="object-cover ..."
  onError={e => {
    (e.target as HTMLImageElement).style.display = 'none';
  }}
/>
```

И fallback-контент (цветной градиент или иконка) на случай недоступности изображения.

---

## Non-Functional Requirements

- **Performance**: Next.js Image optimization остаётся
- **Accessibility**: сохранить aria-labels, focus states
- **Responsive**: mobile-first, sidebar становится top-bar на мобильных
- **Browser Support**: текущий стек (Edge, Chrome, Safari)

---

## Out of Scope

- Страница `/login` — не трогаем
- Лендинг (`/`) — не трогаем
- Новые API endpoints
- Изменения в next-auth / middleware
- Добавление новых полей в БД

---

## Open Questions for Implementation

1. На макете image2.png Stories — просто кремовые прямоугольники без текста. Добавлять ли title поверх градиентом (как сейчас) или убрать текст внутри карточек полностью?
2. MaterialCard: делать полностью кремовый фон или полупрозрачный glass?
3. Нужно ли добавить hover-анимации на кремовые карточки stories?

---

## Appendix: Reference Images

- `images/image2.png` — Dashboard mockup (cream stories cards, cream footer, right sidebar)
- `images/image4.png` — Materials mockup (serif heading, cream filter pills)
- `images/image1.png` — Login reference (out of scope)

---

_Spec created: 2026-04-17_
_Project: Profit-Premium_
