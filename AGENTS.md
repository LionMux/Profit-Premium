<!-- AGENTS.md — Profit-Premium -->
# AGENTS.md — Profit-Premium

Этот файл содержит essential information для AI coding agents, работающих над проектом Profit-Premium.

---

## Project Overview

**Profit-Premium** — закрытый личный кабинет для партнеров-агентов по недвижимости. Сайт предоставляет доступ к материалам объектов, юридической информации и инструменту передачи клиентов в CRM.

- **Repository**: https://github.com/LionMux/Profit-Premium
- **License**: MIT License (Copyright 2026 Лев Мухачев)
- **Status**: Active development
- **Access**: Closed registration (только приглашенные партнеры)

### Core User Flows

1. **Авторизация**: email + пароль ИЛИ SMS-код → редирект на главную
2. **Главная**: блок "сторис" (карусель карточек) + навигация
3. **Материалы**: фильтрация презентаций по городу и типу недвижимости (кнопки)
4. **Личный кабинет**: профиль + кнопка "Передать клиента" → форма → Bitrix24
5. **Контакты**: юридическая информация о компании (ИНН, ОГРН, адрес)
6. **Админка**: загрузка новых презентаций (для менеджеров)

---

## Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Framework | Next.js 14.2.3 (App Router) | React framework с SSR/SSG |
| Language | TypeScript 5.4.5 | Type safety |
| Styling | Tailwind CSS 3.4.3 | Utility-first CSS |
| UI Kit | shadcn/ui + Radix UI | Headless components |
| ORM | Prisma 5.13.0 | Database access |
| Database | PostgreSQL 15+ | Primary data storage |
| Auth | NextAuth.js 5.0.0-beta.17 | JWT-based authentication |
| SMS | SMS.ru API | SMS code delivery |
| Validation | Zod 3.23.6 | Schema validation |
| Testing | Playwright 1.44.0 | E2E testing |
| Linting | ESLint 8.57.0 + Prettier 3.2.5 | Code quality |
| CI/CD | GitHub Actions | Automated testing |
| Deployment | Docker + Docker Compose | Production hosting |

---

## Project Structure

```
profit-premium/
├─ AGENTS.md                 # Этот файл
├─ README.md                 # Публичная документация
├─ .env.example              # Шаблон переменных окружения
├─ .env.local                # Локальные переменные (не коммитить!)
├─ .gitignore
├─ .eslintrc.json            # ESLint конфигурация
├─ .prettierrc               # Prettier конфигурация
├─ docker-compose.yml        # Production deployment
├─ Dockerfile                # Multi-stage Docker build
├─ next.config.js            # Next.js конфигурация
├─ tailwind.config.ts        # Tailwind CSS конфигурация
├─ tsconfig.json             # TypeScript конфигурация
├─ playwright.config.ts      # Playwright E2E конфигурация
├─ postcss.config.js         # PostCSS конфигурация
├─ package.json              # NPM зависимости и скрипты
├─ prisma/
│  ├─ schema.prisma          # Схема БД
│  └─ seed.ts                # Seed данные
├─ public/
│  └─ uploads/               # Загруженные файлы (gitignored)
├─ src/
│  ├─ app/                   # Next.js App Router
│  │  ├─ (auth)/             # Группа: авторизация
│  │  │  ├─ layout.tsx       # Layout с ToastProvider
│  │  │  └─ login/page.tsx   # Страница входа (email + SMS)
│  │  ├─ (dashboard)/        # Группа: личный кабинет
│  │  │  ├─ layout.tsx       # Layout с Sidebar (справа) + Header
│  │  │  ├─ page.tsx         # Главная (сторис карусель)
│  │  │  ├─ materials/page.tsx   # Страница материалов с фильтрами
│  │  │  ├─ profile/page.tsx     # Личный кабинет + форма передачи клиента
│  │  │  └─ contacts/page.tsx    # Юридическая информация
│  │  ├─ admin/page.tsx      # Админ-панель загрузки материалов
│  │  ├─ api/                # API Routes
│  │  │  ├─ auth/[...nextauth]/route.ts  # NextAuth endpoint
│  │  │  ├─ auth/sms/send/route.ts       # Отправка SMS кода
│  │  │  ├─ auth/sms/verify/route.ts     # Проверка SMS кода
│  │  │  ├─ client-leads/route.ts        # Форма "Передать клиента"
│  │  │  ├─ materials/route.ts           # CRUD материалов
│  │  │  └─ upload/route.ts              # Загрузка файлов
│  │  ├─ layout.tsx          # Корневой layout
│  │  └─ page.tsx            # Редирект на /login
│  ├─ components/
│  │  ├─ ui/                 # UI компоненты (button, input, card)
│  │  ├─ layout/             # Layout компоненты
│  │  │  ├─ Header.tsx       # Шапка с пользователем и выходом
│  │  │  └─ Sidebar.tsx      # Боковое меню (справа)
│  │  └─ auth/               # Компоненты авторизации
│  │     └─ PhoneInput.tsx   # Маскированный ввод телефона
│  ├─ lib/
│  │  ├─ auth.ts             # Конфигурация NextAuth
│  │  ├─ prisma.ts           # Инициализация Prisma клиента
│  │  ├─ sms.ts              # SMS.ru API клиент
│  │  └─ utils.ts            # Утилиты (cn, formatPhoneNumber, generateSMSCode)
│  ├─ types/
│  │  ├─ index.ts            # Глобальные TypeScript типы
│  │  └─ next-auth.d.ts      # Расширение типов NextAuth
│  ├─ styles/
│  │  └─ globals.css         # Глобальные стили Tailwind
│  ├─ tests/
│  │  └─ e2e/
│  │     ├─ auth.spec.ts
│  │     ├─ materials.spec.ts
│  │     └─ client-transfer.spec.ts
│  └─ middleware.ts          # Защита роутов
└─ .github/
   └─ workflows/
      └─ ci.yml              # CI pipeline
```

---

## Database Schema (Prisma)

```prisma
model User {
  id           String   @id @default(uuid())
  email        String?  @unique
  phone        String?  @unique
  passwordHash String?
  name         String
  role         Role     @default(PARTNER)
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  clientLeads ClientLead[]
  accounts    Account[]
  sessions    Session[]
}

model SmsCode {
  id        String   @id @default(uuid())
  phone     String
  code      String
  expiresAt DateTime
  attempts  Int      @default(0)
  createdAt DateTime @default(now())

  @@index([phone, createdAt])
}

model Material {
  id           String   @id @default(uuid())
  title        String
  description  String?
  fileUrl      String
  thumbnailUrl String?
  city         String
  propertyType String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([city])
  @@index([propertyType])
  @@index([city, propertyType])
}

model ClientLead {
  id           String     @id @default(uuid())
  fullName     String
  phone        String
  city         String
  comment      String?
  status       LeadStatus @default(NEW)
  bitrixId     String?
  errorMessage String?
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  user   User   @relation(fields: [userId], references: [id])
  userId String

  @@index([userId])
  @@index([status])
}

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

enum Role {
  ADMIN
  MANAGER
  PARTNER
}

enum LeadStatus {
  NEW
  SENT_TO_BITRIX
  ERROR
  PROCESSED
}
```

---

## Build and Development Commands

### Environment Setup

```bash
# 1. Клонирование и установка зависимостей
git clone https://github.com/LionMux/Profit-Premium.git
cd profit-premium
npm install

# 2. Настройка окружения
cp .env.example .env.local
# Заполнить обязательные поля:
# - DATABASE_URL
# - NEXTAUTH_SECRET (минимум 32 символа)
# - NEXTAUTH_URL
# - SMS_API_KEY (для SMS авторизации)
# - BITRIX_WEBHOOK_URL (для интеграции)

# 3. Инициализация БД
npx prisma migrate dev
npx prisma db seed

# 4. Запуск dev сервера
npm run dev
```

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Build production bundle |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format:check` | Check Prettier formatting |
| `npm run format:write` | Fix Prettier formatting |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Create and apply migration |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Seed database with test data |

### Test Credentials (from seed.ts)

- **Admin**: `admin@profit-premium.ru` / `admin123`
- **Partner**: `partner@example.com` / `partner123`

---

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode**: enabled (`strict: true` в tsconfig.json)
- **Module resolution**: `bundler`
- **Path aliases**:
  - `@/*` → `./src/*`
  - `@/components/*` → `./src/components/*`
  - `@/lib/*` → `./src/lib/*`
  - `@/types/*` → `./src/types/*`
  - `@/styles/*` → `./src/styles/*`

### ESLint Configuration

```json
{
  "extends": ["next/core-web-vitals"]
}
```

### Prettier Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Components | PascalCase | `Sidebar.tsx`, `PhoneInput.tsx` |
| Pages | page.tsx | `app/materials/page.tsx` |
| API Routes | route.ts | `app/api/materials/route.ts` |
| Utilities | camelCase | `auth.ts`, `utils.ts` |
| Types | PascalCase | `types/index.ts` |

### Code Patterns

- Использовать `async/await` для асинхронных операций
- Валидировать входные данные с помощью Zod
- Использовать `cn()` из `lib/utils.ts` для условных классов Tailwind
- Server Components по умолчанию, `'use client'` только при необходимости

---

## Testing Instructions

### E2E Tests (Playwright)

Конфигурация: `playwright.config.ts`
- **Test directory**: `./src/tests/e2e`
- **Base URL**: `http://localhost:3000`
- **Browser**: Microsoft Edge (desktop)
- **Web server**: автоматический запуск `npm run dev`

```bash
# Запуск всех E2E тестов
npm run test:e2e

# Запуск с UI режимом
npx playwright test --ui

# Запуск конкретного файла
npx playwright test auth.spec.ts
```

### Test Files

- `auth.spec.ts` — тесты авторизации (email и SMS)
- `materials.spec.ts` — тесты страницы материалов
- `client-transfer.spec.ts` — тесты формы передачи клиента

### Manual Testing Checklist

- [ ] Вход по email работает корректно
- [ ] Вход по SMS отправляет код и авторизует
- [ ] Фильтрация материалов по городу и типу
- [ ] Форма передачи клиента создает запись в БД
- [ ] Загрузка файлов работает (admin)
- [ ] Выход из системы перенаправляет на /login

---

## Security Considerations

### Authentication & Authorization

- ✅ NextAuth.js с JWT стратегией (30 дней)
- ✅ Пароли хешируются bcrypt (10 rounds)
- ✅ Защита роутов через `middleware.ts`
- ✅ Проверка ролей (ADMIN, MANAGER, PARTNER) в API
- ✅ SMS rate limit: max 3 SMS в час на номер
- ✅ SMS код действителен 5 минут, max 3 попытки

### File Uploads

- ✅ Валидация MIME-типов: `application/pdf`, `image/jpeg`, `image/png`, `image/webp`
- ✅ Проверка размера: max 50MB
- ✅ Доступ только для ADMIN/MANAGER
- ✅ Файлы сохраняются в `public/uploads/`

### API Security

- ✅ Input validation с Zod на всех API
- ✅ SQL-защита через Prisma ORM
- ✅ CSRF защита через SameSite cookies
- ✅ CORS настройка для API routes

### Environment Variables (Required)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/profit_premium?schema=public"

# Auth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-min-32-characters-long"

# SMS Provider (SMS.ru)
SMS_API_KEY="your-sms-api-key"
SMS_PROVIDER="smsru"

# Bitrix24
BITRIX_WEBHOOK_URL="https://your-domain.bitrix24.ru/rest/1/webhook-token/"

# Storage
UPLOAD_DIR="/app/uploads"
MAX_FILE_SIZE="52428800"
```

**Важно**: Никогда не коммитить `.env.local` с реальными значениями!

---

## Deployment

### Docker (Production)

```bash
# Сборка и запуск
docker-compose up -d --build

# Применение миграций
docker-compose exec app npx prisma migrate deploy

# Просмотр логов
docker-compose logs -f app
```

### CI/CD Pipeline

GitHub Actions (`.github/workflows/ci.yml`):
1. Checkout кода
2. Setup Node.js 20
3. Install dependencies
4. Generate Prisma client
5. Run ESLint
6. Check formatting
7. Type check
8. Build

---

## Key Implementation Details

### Authentication Flow

1. **Email + Password**: credentials provider с проверкой bcrypt
2. **SMS**: 
   - `/api/auth/sms/send` — генерация 6-значного кода, сохранение в БД, отправка через SMS.ru
   - `/api/auth/sms/verify` — проверка кода, создание пользователя при отсутствии
   - Rate limiting: 3 SMS/час на номер
   - Код действителен 5 минут, 3 попытки

### Phone Number Format

- Формат отображения: `+7 (999) 999-99-99`
- Нормализация: `+7XXXXXXXXXX`
- Компонент: `PhoneInput.tsx` с авто-форматированием

### Materials Filtering

- Query параметры: `?city=Moscow&propertyType=Apartment`
- Server-side filtering через Prisma
- UI: кнопки фильтров с активным состоянием

### Client Lead Transfer

- Форма: ФИО, телефон, город, комментарий
- Валидация: Zod schema
- Сохранение в БД с привязкой к пользователю
- TODO: интеграция с Bitrix24

---

## Useful Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Prisma ORM Docs](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Playwright Testing](https://playwright.dev/)
- [SMS.ru API](https://sms.ru/api/)
- [Bitrix24 REST API](https://dev.1c-bitrix.ru/rest_help/)

---

## Changelog

| Date | Author | Changes |
|------|--------|---------|
| 2026-04-07 | Agent | Project initialized |
| 2026-04-08 | Agent | Updated AGENTS.md with actual project structure |

---

*End of AGENTS.md*
