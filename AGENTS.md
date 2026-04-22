<!-- AGENTS.md — Profit-Premium -->

# AGENTS.md — Profit-Premium

Этот файл содержит essential information для AI coding agents, работающих над проектом **Profit-Premium**.

---

## Project Overview

**Profit-Premium** — закрытый личный кабинет для партнеров-агентов по недвижимости. Сайт предоставляет доступ к материалам объектов, юридической информации и инструменту передачи клиентов в CRM.

- **Repository**: https://github.com/LionMux/Profit-Premium
- **License**: MIT License (Copyright 2026 Лев Мухачев)
- **Status**: Active development
- **Access**: Closed registration (только приглашенные партнеры)

### Core User Flows

1. **Авторизация**: email + пароль ИЛИ SMS-код → редирект на `/dashboard`
2. **Лендинг** (`/`): публичная страница с разделами Hero, Преимущества, Услуги, Команда, Отзывы, Контакты
3. **Главная** (`/dashboard`): блок "сторис" (карусель карточек) + навигация
4. **Материалы** (`/materials`): фильтрация презентаций по городу и типу недвижимости (кнопки)
5. **Личный кабинет** (`/profile`): профиль + кнопка "Передать клиента" → форма → сохранение в БД (Bitrix24 — TODO)
6. **Контакты** (`/contacts`): юридическая информация о компании (ИНН, ОГРН, адрес, реквизиты)
7. **Админка** (`/admin`): загрузка новых презентаций, статистика, управление сторис (для ADMIN/MANAGER)

---

## Technology Stack

| Component  | Technology                          | Purpose                      |
| ---------- | ----------------------------------- | ---------------------------- |
| Framework  | Next.js 14.2.3 (App Router)         | React framework с SSR/SSG    |
| Language   | TypeScript 5.4.5                    | Type safety                  |
| Styling    | Tailwind CSS 3.4.3                  | Utility-first CSS            |
| UI Kit     | shadcn/ui + Radix UI                | Headless components          |
| Forms      | react-hook-form + Zod               | Form handling and validation |
| ORM        | Prisma 5.13.0                       | Database access              |
| Database   | PostgreSQL 15+                      | Primary data storage         |
| Auth       | NextAuth.js 5.0.0-beta.17 (Auth.js) | JWT-based authentication     |
| SMS        | SMS.ru API                          | SMS code delivery            |
| Validation | Zod 3.23.6                          | Schema validation            |
| Testing    | Playwright 1.44.0                   | E2E testing                  |
| Linting    | ESLint 8.57.0 + Prettier 3.8.1      | Code quality                 |
| CI/CD      | GitHub Actions                      | Automated testing            |
| Deployment | Docker + Docker Compose             | Production hosting           |

---

## Project Structure

```
profit-premium/
├── prisma/
│   ├── migrations/          # Database migrations
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed data (test users, materials, stories)
├── public/
│   ├── uploads/             # Uploaded files (gitignored in production)
│   ├── presentations/       # Static presentations
│   └── stories/             # Story images
├── scripts/
│   ├── seed-stories.ts      # Standalone stories seed script
│   └── verify-db.ts         # Database connectivity verification
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/          # Route group: authentication pages
│   │   │   ├── layout.tsx
│   │   │   └── login/
│   │   │       └── page.tsx           # Login page (email + SMS)
│   │   ├── (dashboard)/     # Route group: authenticated pages
│   │   │   ├── layout.tsx               # Dashboard layout with right sidebar
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx             # Homepage with stories carousel
│   │   │   ├── materials/
│   │   │   │   └── page.tsx             # Materials with city/type filters
│   │   │   ├── profile/
│   │   │   │   └── page.tsx             # Profile + client transfer form
│   │   │   └── contacts/
│   │   │       └── page.tsx             # Legal company info
│   │   ├── admin/
│   │   │   └── page.tsx                 # Admin panel (stats, upload, stories)
│   │   ├── api/                         # API Routes
│   │   │   ├── auth/[...nextauth]/
│   │   │   │   └── route.ts             # NextAuth endpoint
│   │   │   ├── auth/sms/send/
│   │   │   │   └── route.ts             # Send SMS code
│   │   │   ├── auth/sms/verify/
│   │   │   │   └── route.ts             # Verify SMS code
│   │   │   ├── client-leads/
│   │   │   │   └── route.ts             # Create client lead
│   │   │   ├── materials/
│   │   │   │   └── route.ts             # GET/POST materials
│   │   │   ├── stories/
│   │   │   │   ├── route.ts             # GET/POST stories
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts         # PATCH/DELETE individual story
│   │   │   └── upload/
│   │   │       └── route.ts             # File upload (admin only)
│   │   ├── layout.tsx                   # Root layout (fonts, metadata)
│   │   └── page.tsx                     # Public landing page
│   ├── components/
│   │   ├── ui/                          # shadcn/ui components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── use-toast.tsx
│   │   ├── layout/                      # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx              # Right sidebar navigation
│   │   │   ├── Footer.tsx
│   │   │   └── ProfitPremiumLogo.tsx
│   │   ├── auth/                        # Auth components
│   │   │   └── PhoneInput.tsx           # Masked phone input
│   │   ├── dashboard/                   # Dashboard components
│   │   │   ├── QuickActionCard.tsx
│   │   │   └── WelcomeSection.tsx
│   │   ├── materials/                   # Materials components
│   │   │   ├── MaterialCard.tsx
│   │   │   ├── FilterBar.tsx            # Desktop filter buttons
│   │   │   └── FilterDrawer.tsx         # Mobile filter drawer
│   │   ├── profile/                     # Profile components
│   │   │   ├── ProfileInfo.tsx
│   │   │   └── TransferClientForm.tsx
│   │   ├── stories/                     # Stories components
│   │   │   └── StoriesCarousel.tsx
│   │   ├── admin/                       # Admin components
│   │   │   ├── ActionCard.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── StoriesManager.tsx
│   │   │   ├── UploadCard.tsx
│   │   │   └── UploadMaterialCard.tsx
│   │   ├── illustrations/               # SVG illustrations
│   │   │   └── BuildingIllustrations.tsx
│   │   ├── landing/                     # Landing page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AdvantagesSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── TeamSection.tsx
│   │   │   ├── ReviewsSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── AccountPromptDialog.tsx
│   │   └── providers/                   # Context providers
│   │       └── SessionProvider.tsx      # NextAuth session provider
│   ├── lib/                             # Utilities
│   │   ├── auth.ts                      # NextAuth configuration + helpers
│   │   ├── prisma.ts                    # Prisma client singleton
│   │   ├── sms.ts                       # SMS.ru API client
│   │   └── utils.ts                     # cn(), formatPhoneNumber(), generateSMSCode()
│   ├── types/                           # TypeScript types
│   │   ├── index.ts                     # Global application types
│   │   └── next-auth.d.ts               # NextAuth type extensions
│   ├── styles/
│   │   └── globals.css                  # Tailwind imports + CSS variables
│   ├── tests/e2e/                       # Playwright E2E tests
│   │   ├── auth.spec.ts
│   │   ├── materials.spec.ts
│   │   └── client-transfer.spec.ts
│   └── middleware.ts                    # Route protection
├── .github/workflows/ci.yml             # GitHub Actions CI
├── docker-compose.yml                   # Production Docker setup
├── Dockerfile                           # Multi-stage Docker build
├── next.config.js                       # Next.js config (CORS, images)
├── tailwind.config.ts                   # Tailwind + custom colors/fonts
├── playwright.config.ts                 # Playwright config (Edge browser)
├── package.json
└── tsconfig.json                        # TypeScript with path aliases
```

---

## Database Schema (Prisma)

```prisma
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

  @@index([role])
  @@index([isActive])
  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String  @map("user_id")
  type              String
  provider          String
  providerAccountId String  @map("provider_account_id")
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique @map("session_token")
  userId       String   @map("user_id")
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

model SmsCode {
  id        String   @id @default(uuid())
  phone     String
  code      String
  expiresAt DateTime
  attempts  Int      @default(0)
  createdAt DateTime @default(now())

  @@index([phone, createdAt])
  @@map("sms_codes")
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
  @@map("materials")
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
  userId String @map("user_id")

  @@index([userId])
  @@index([status])
  @@map("client_leads")
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
  @@map("stories")
}
```

---

## Build and Development Commands

### Environment Setup

```bash
# 1. Clone and install dependencies
git clone https://github.com/LionMux/Profit-Premium.git
cd profit-premium
npm install

# 2. Setup environment
cp .env.example .env.local
# Required variables:
# - DATABASE_URL
# - NEXTAUTH_SECRET (min 32 chars)
# - NEXTAUTH_URL
# - SMS_API_KEY (for SMS auth)
# - BITRIX_WEBHOOK_URL (for CRM integration)

# 3. Initialize database
npx prisma migrate dev
npx prisma db seed

# 4. Start development server
npm run dev
```

### Available Commands

| Command                | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Start development server (http://localhost:3000) |
| `npm run build`        | Build production bundle                          |
| `npm start`            | Start production server                          |
| `npm run lint`         | Run ESLint (`next/core-web-vitals`)              |
| `npm run format:check` | Check Prettier formatting                        |
| `npm run format:write` | Fix Prettier formatting                          |
| `npm run test:e2e`     | Run Playwright E2E tests                         |
| `npm run db:generate`  | Generate Prisma client                           |
| `npm run db:migrate`   | Create and apply migration                       |
| `npm run db:studio`    | Open Prisma Studio                               |
| `npm run db:seed`      | Seed database with test data                     |

### Test Credentials (from seed.ts)

- **Admin**: `admin@profit-premium.ru` / `admin123`
- **Partner**: `partner@example.com` / `partner123`

---

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode**: enabled (`strict: true`)
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

| Type       | Pattern    | Example                         |
| ---------- | ---------- | ------------------------------- |
| Components | PascalCase | `Sidebar.tsx`, `PhoneInput.tsx` |
| Pages      | page.tsx   | `app/materials/page.tsx`        |
| API Routes | route.ts   | `app/api/materials/route.ts`    |
| Utilities  | camelCase  | `auth.ts`, `utils.ts`           |
| Types      | camelCase  | `types/index.ts`                |

### Code Patterns

- Использовать `async/await` для асинхронных операций
- Валидировать входные данные с помощью Zod
- Использовать `cn()` из `lib/utils.ts` для условных классов Tailwind
- Server Components по умолчанию, `'use client'` только при необходимости
- API responses в формате: `{ success: boolean, data?: any, error?: string }`
- Формы: `react-hook-form` + `@hookform/resolvers/zod` + Zod схемы
- Компоненты группируются по **домену/фиче**, а не по типу

### Custom Colors (Tailwind)

```typescript
// tailwind.config.ts
colors: {
  burgundy: {
    DEFAULT: '#5C1E2D',
    dark: '#3D1220',
    medium: '#7A2B3E',
    light: '#9B4458',
  },
  cream: {
    DEFAULT: '#F0EAE0',
    dark: '#E0D5C5',
    light: '#F8F4EF',
  },
}
```

### Fonts

- **Sans**: `Inter` (latin + cyrillic) — `--font-inter`
- **Serif**: `Cormorant Garamond` (400-700) — `--font-cormorant`

---

## Testing Instructions

### E2E Tests (Playwright)

Конфигурация: `playwright.config.ts`

- **Test directory**: `./src/tests/e2e`
- **Base URL**: `http://localhost:3000`
- **Browser**: Microsoft Edge (desktop)
- **Web server**: автоматический запуск `npm run dev`

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode
npx playwright test --ui

# Run specific file
npx playwright test auth.spec.ts
```

### Test Files

| File                      | Tests | Описание                                               |
| ------------------------- | ----- | ------------------------------------------------------ |
| `auth.spec.ts`            | 4     | Логин страница, email вход, SMS таб, неудачный вход    |
| `materials.spec.ts`       | 2     | Отображение страницы, фильтр по городу с URL assertion |
| `client-transfer.spec.ts` | 2     | Видимость формы, успешная отправка с toast             |

### Testing Strategy Notes

- Только **E2E тесты** — юнит/интеграционные тесты отсутствуют
- Тесты зависят от **seed-данных** в базе
- Auth-тесты используют UI-логин (`beforeEach`)
- **CI pipeline НЕ запускает Playwright тесты** — только lint, format, typecheck, build

### Manual Testing Checklist

- [ ] Вход по email работает корректно (редирект на `/dashboard`)
- [ ] Вход по SMS отправляет код и авторизует
- [ ] Фильтрация материалов по городу и типу
- [ ] Форма передачи клиента создает запись в БД
- [ ] Загрузка файлов работает (admin/manager)
- [ ] Выход из системы перенаправляет на `/login`
- [ ] Лендинг (`/`) доступен без авторизации

---

## Security Considerations

### Authentication & Authorization

- ✅ NextAuth.js с JWT стратегией (30 days)
- ✅ Пароли хешируются bcryptjs (10 rounds)
- ✅ Защита роутов через `middleware.ts`
- ✅ Проверка ролей (ADMIN, MANAGER, PARTNER) в API и на страницах
- ✅ SMS rate limit: max 3 SMS в час на номер
- ✅ SMS код действителен 5 минут, max 3 попытки

### File Uploads

- ✅ Валидация MIME-типов: `application/pdf`, `image/jpeg`, `image/png`, `image/webp`
- ✅ Проверка размера: max 50MB
- ✅ Доступ только для ADMIN/MANAGER
- ✅ Файлы сохраняются в `public/uploads/`

### API Security

- ✅ Input validation с Zod на всех API
- ✅ SQL-защита через Prisma ORM (no raw queries)
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
# Build and run
docker-compose up -d --build

# Apply migrations
docker-compose exec app npx prisma migrate deploy

# View logs
docker-compose logs -f app
```

### CI/CD Pipeline

GitHub Actions (`.github/workflows/ci.yml`):

1. Checkout code
2. Setup Node.js 20
3. Install dependencies
4. Generate Prisma client
5. Run ESLint
6. Check formatting
7. Type check (`tsc --noEmit`)
8. Build

Триггеры: push и pull_request на ветки `main` и `develop`.

### Backup Strategy

- **Database**: Ежедневные автоматические бэкапы (pg_dump)
- **Files**: Ежедневный backup загруженных файлов
- **Retention**: Хранить бэкапы за последние 30 дней

---

## Key Implementation Details

### Authentication Flow

1. **Email + Password**: credentials provider с проверкой bcryptjs
2. **SMS**:
   - `/api/auth/sms/send` — генерация 6-значного кода, сохранение в БД, отправка через SMS.ru
   - `/api/auth/sms/verify` — проверка кода, обновление попыток, возврат данных пользователя
   - Rate limiting: 3 SMS/час на номер
   - Код действителен 5 минут, 3 попытки
   - При первой SMS-авторизации пользователь создается автоматически с ролью PARTNER

### Route Protection (middleware.ts)

- Публичные роуты: `/`, `/login`, `/api/auth/*`
- Защищенные роуты (требуют авторизации): `/dashboard`, `/materials`, `/profile`, `/contacts`, `/admin`
- Авторизованных пользователей с `/login` редиректит на `/dashboard`

### Phone Number Format

- Формат отображения: `+7 (999) 999-99-99`
- Нормализация: `+7XXXXXXXXXX`
- Компонент: `PhoneInput.tsx` с авто-форматированием

### Materials Filtering

- Query параметры: `?city=Москва&propertyType=Квартира`
- Server-side filtering через Prisma
- UI: кнопки фильтров с активным состоянием (`FilterBar` для десктопа, `FilterDrawer` для мобильных)

### Client Lead Transfer

- Форма: ФИО, телефон, город, комментарий
- Валидация: Zod schema
- Сохранение в БД с привязкой к пользователю
- TODO: интеграция с Bitrix24

### Stories Management

- Модель `Story` с полями: imageUrl, title, link, order, isActive
- API: полный CRUD через `/api/stories` и `/api/stories/[id]`
- Компонент `StoriesCarousel` — drag-to-scroll карусель с авто-воспроизведением
- Управление сторис доступно в админ-панели через `StoriesManager`

### Landing Page

- Корневой `/` — публичная страница (не требует авторизации)
- Секции: Hero, Advantages, Services, Team, Reviews, Contact
- Фиксированный правый Sidebar на десктопе
- Анимации: fadeIn, fadeInUp, slideIn, scaleIn, shimmer, pulse-soft (определены в `globals.css`)

### Design System Notes

- **Aesthetic**: бордовый (`#5C1E2D`) + кремовый (`#F0EAE0`) палитра
- **Corners**: преимущественно острые углы (`rounded-none` или без скругления)
- **Glassmorphism**: `bg-white/5 backdrop-blur-sm border border-white/10`
- **Labels**: uppercase с широким трекингом (`tracking-[0.3em] uppercase text-[10px]`)
- **Illustrations**: декоративные SVG с очень низкой непрозрачностью (`opacity-[0.04]`)

---

## Useful Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Prisma ORM Docs](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Playwright Testing](https://playwright.dev/)
- [SMS.ru API](https://sms.ru/api/)

---

## Changelog

| Date       | Author | Changes                                                                                          |
| ---------- | ------ | ------------------------------------------------------------------------------------------------ |
| 2026-04-07 | Agent  | Project initialized                                                                              |
| 2026-04-08 | Agent  | Updated AGENTS.md with actual project structure                                                  |
| 2026-04-17 | Agent  | Full audit and update based on actual codebase                                                   |
| 2026-04-23 | Agent  | Comprehensive update: added missing components, API routes, testing notes, design system details |

---

_End of AGENTS.md_
