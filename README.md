# Profit Premium

Закрытый личный кабинет для партнёров-агентов по недвижимости.

[![CI](https://github.com/LionMux/Profit-Premium/actions/workflows/ci.yml/badge.svg)](https://github.com/LionMux/Profit-Premium/actions/workflows/ci.yml)

## Описание

**Profit Premium** — платформа для партнёров-агентов по недвижимости, предоставляющая доступ к маркетинговым материалам объектов, инструментам передачи клиентов в CRM и закрытому сообществу.

### Лендинг (`/`)

Публичная страница с анимациями:

- **Hero** — Canvas mesh gradient + переливающийся фон, анимированные цифры (SlotCounter), посимвольное появление заголовка (SplitText)
- **Преимущества** — анимированная SVG-линия с прогрессом скролла (ScrollLine)
- **Услуги** — карточки услуг с эффектом 3D наклона при наведении (TiltCard)
- **Команда** — карточки экспертов с опытом и статистикой
- **Отзывы** — блок с отзывами клиентов
- **Контакты** — форма заявки + контактная информация

Фиксированный правый Sidebar на десктопе с навигацией по разделам лендинга и кнопкой входа.

### Личный кабинет (авторизация требуется)

- **Главная** (`/dashboard`) — сторис-карусель, список свежих материалов, статистика
- **Материалы** (`/materials`) — фильтрация презентаций по городу и типу недвижимости
- **Профиль** (`/profile`) — данные пользователя, форма передачи клиента в CRM
- **Контакты** (`/contacts`) — юридическая информация о компании (ИНН, ОГРН, реквизиты)
- **Админ-панель** (`/admin`) — статистика, загрузка материалов, управление сторис, воронка лидов

### Аутентификация

- Email + пароль (bcrypt)
- SMS-код (SMS.ru API) — автоматическая регистрация при первом входе
- JWT-сессии (30 дней)
- Защита роутов через middleware

## Технологии

| Компонент | Технология | Назначение |
|-----------|-----------|------------|
| Framework | Next.js 14.2 (App Router) | React framework с SSR/SSG |
| Language | TypeScript 5.4 | Type safety |
| Styling | Tailwind CSS 3.4 | Utility-first CSS |
| UI Kit | shadcn/ui + Radix UI | Headless компоненты |
| Forms | react-hook-form + Zod | Валидация и обработка форм |
| ORM | Prisma 5.13 | Database access |
| Database | PostgreSQL 15+ | Основное хранилище |
| Auth | NextAuth.js 5.0 beta | JWT-аутентификация |
| SMS | SMS.ru API | Доставка SMS-кодов |
| Testing | Playwright 1.44 | E2E тесты |
| CI/CD | GitHub Actions | Автоматизированное тестирование |
| Deploy | Docker + Docker Compose | Production хостинг |

### Кастомные анимации (без GSAP / Framer Motion)

| Компонент | Технология | Описание |
|-----------|-----------|----------|
| MeshGradient | Canvas 2D + rAF | Органичный градиентный фон с floating blobs |
| SlotCounter | CSS transforms + IO | Слот-машина для цифр (0→9→target) |
| SplitText | CSS transitions + IO | Посимвольное появление текста со stagger |
| ScrollLine | SVG stroke-dasharray + IO | Прогресс-линия, привязанная к скроллу |
| TiltCard | CSS 3D transforms + rAF | 3D наклон карточки при наведении мыши |

Все анимации поддерживают `prefers-reduced-motion`.

## Установка

```bash
# Клонирование
git clone https://github.com/LionMux/Profit-Premium.git
cd profit-premium

# Установка зависимостей
npm install

# Настройка окружения
cp .env.example .env.local
# Заполните переменные:
# - DATABASE_URL
# - NEXTAUTH_SECRET (минимум 32 символа)
# - NEXTAUTH_URL
# - SMS_API_KEY (для SMS-аутентификации)
# - BITRIX_WEBHOOK_URL (для интеграции с CRM)

# Инициализация базы данных
npx prisma migrate dev
npx prisma db seed

# Запуск dev сервера
npm run dev
```

## Docker (Production)

```bash
# Сборка и запуск
docker-compose up -d --build

# Применение миграций
docker-compose exec app npx prisma migrate deploy

# Просмотр логов
docker-compose logs -f app
```

## Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev сервера (localhost:3000) |
| `npm run build` | Сборка production bundle |
| `npm start` | Запуск production сервера |
| `npm run lint` | Проверка ESLint |
| `npm run format:check` | Проверка форматирования Prettier |
| `npm run format:write` | Исправление форматирования |
| `npm run test:e2e` | E2E тесты Playwright |
| `npx prisma studio` | Prisma Studio |
| `npx prisma migrate dev` | Создание и применение миграции |
| `npx prisma db seed` | Заполнение тестовыми данными |

## Тестовые данные

| Роль | Email | Пароль |
|------|-------|--------|
| Admin | `admin@profit-premium.ru` | `admin123` |
| Partner | `partner@example.com` | `partner123` |

## Структура проекта

```
profit-premium/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Группа роутов: аутентификация
│   │   ├── (dashboard)/        # Группа роутов: личный кабинет
│   │   ├── admin/              # Админ-панель
│   │   ├── api/                # API Routes
│   │   ├── layout.tsx          # Корневой layout
│   │   └── page.tsx            # Лендинг
│   ├── components/
│   │   ├── ui/                 # shadcn/ui компоненты
│   │   ├── effects/            # Анимации (MeshGradient, TiltCard и др.)
│   │   ├── landing/            # Секции лендинга
│   │   ├── layout/             # Header, Sidebar, Footer
│   │   ├── dashboard/          # Компоненты дашборда
│   │   ├── materials/          # Фильтры, карточки материалов
│   │   ├── profile/            # Профиль, форма передачи клиента
│   │   ├── stories/            # StoriesCarousel
│   │   └── admin/              # Компоненты админки
│   ├── lib/                    # Утилиты, auth, prisma, sms
│   ├── types/                  # TypeScript типы
│   ├── styles/                 # Глобальные стили, CSS-анимации
│   └── tests/e2e/              # Playwright E2E тесты
├── prisma/                     # Схема БД, миграции, seed
├── public/                     # Статические файлы, загрузки
└── docker-compose.yml          # Production деплой
```

## Дизайн-система

- **Палитра**: бордовый (`#5C1E2D`) + кремовый (`#F0EAE0`)
- **Шрифты**: Inter (основной), Cormorant Garamond (заголовки)
- **Скругление**: преимущественно острые углы
- **Эффекты**: glassmorphism (`bg-white/5 backdrop-blur-sm`)

## Лицензия

MIT License (Copyright 2026 Лев Мухачёв)
