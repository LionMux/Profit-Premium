<!-- AGENTS.md — Profit-Premium -->
# AGENTS.md — Profit-Premium

Этот файл содержит essential information для AI coding agents, работающих над проектом Profit-Premium.

---

## Project Overview

**Profit-Premium** — закрытый личный кабинет для партнеров-агентов по недвижимости. Сайт предоставляет доступ к материалам объектов, юридической информации и инструменту передачи клиентов в CRM.

- **Repository**: https://github.com/LionMux/Profit-Premium
- **License**: MIT License (Copyright 2026 Лев Мухачев)
- **Status**: Initialized — ready for development
- **Access**: Closed registration (только приглашенные партнеры)

### Core User Flows

1. **Авторизация**: email + пароль ИЛИ SMS-код → редирект на главную
2. **Главная**: блок "сторис" (карусель карточек в формате Samokat) + навигация
3. **Материалы**: фильтрация презентаций по городу и типу недвижимости (кнопки)
4. **Личный кабинет**: профиль + кнопка "Передать клиента" → форма → Bitrix24
5. **Контакты**: юридическая информация о компании (ИНН, ОГРН, адрес)
6. **Админка**: загрузка новых презентаций (для менеджеров)

---

## Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Framework | Next.js 14 (App Router) | React framework с SSR/SSG |
| Language | TypeScript 5.x | Type safety |
| Styling | Tailwind CSS 3.x | Utility-first CSS |
| UI Kit | shadcn/ui | Headless components |
| ORM | Prisma 5.x | Database access |
| Database | PostgreSQL 15+ | Primary data storage |
| Auth | NextAuth.js 5.x | JWT-based authentication |
| SMS | SMS.ru API | SMS code delivery |
| CRM | Bitrix24 Webhook | Lead integration |
| Testing | Playwright | E2E testing |
| Linting | ESLint + Prettier | Code quality |
| CI/CD | GitHub Actions | Automated testing & deploy |
| Deployment | Docker + VPS | Production hosting |

---

## Project Structure

```
profit-premium/
├─ AGENTS.md                 # Этот файл
├─ README.md                 # Публичная документация
├─ .env.example              # Шаблон переменных окружения
├─ .gitignore
├─ docker-compose.yml        # Production deployment
├─ Dockerfile
├─ package.json
├─ next.config.js
├─ tailwind.config.ts
├─ tsconfig.json
├─ eslint.config.js
├─ playwright.config.ts
├─ prisma/
│  ├─ schema.prisma          # Схема БД
│  ├─ migrations/            # Миграции базы данных
│  └─ seed.ts                # Seed данные
├─ public/
│  ├─ uploads/               # Загруженные файлы (gitignored)
│  └─ presentations/         # Презентации объектов (gitignored)
├─ src/
│  ├─ app/                   # Next.js App Router
│  │  ├─ (auth)/             # Группа: авторизация
│  │  │  └─ login/page.tsx   # Страница входа (email + SMS)
│  │  ├─ (dashboard)/        # Группа: личный кабинет
│  │  │  ├─ page.tsx         # Главная (сторис карусель)
│  │  │  ├─ layout.tsx       # Layout с боковым меню СПРАВА + Footer
│  │  │  ├─ materials/       # Страница материалов с фильтрами
│  │  │  ├─ profile/         # Личный кабинет + кнопка "Передать клиента"
│  │  │  └─ contacts/        # Юридическая информация (ИНН, ОГРН, адрес)
│  │  ├─ admin/              # Админ-панель
│  │  ├─ api/                # API Routes
│  │  │  ├─ auth/[...nextauth]/route.ts  # NextAuth endpoint
│  │  │  ├─ auth/sms/send/route.ts       # Отправка SMS кода
│  │  │  ├─ auth/sms/verify/route.ts     # Проверка SMS кода
│  │  │  ├─ materials/route.ts           # CRUD материалов
│  │  │  ├─ upload/route.ts              # Загрузка файлов
│  │  │  ├─ client-leads/route.ts        # Форма "Передать клиента"
│  │  │  └─ stories/route.ts             # CRUD сторис
│  │  ├─ layout.tsx          # Корневой layout
│  │  └─ page.tsx            # Редирект на /login
│  ├─ components/
│  │  ├─ ui/                 # UI компоненты (button, input, card)
│  │  ├─ layout/             # Layout компоненты
│  │  │  ├─ Sidebar.tsx      # Боковое меню (справа)
│  │  │  ├─ Header.tsx       # Шапка с пользователем
│  │  │  └─ Footer.tsx       # Подвал с контактами и соцсетями
│  │  ├─ auth/               # Компоненты авторизации
│  │  │  ├─ PhoneInput.tsx   # Маскированный ввод телефона
│  │  │  └─ SmsLoginForm.tsx # Форма входа по SMS
│  │  ├─ stories/            # Компоненты сторис
│  │  │  ├─ StoriesCarousel.tsx  # Карусель сторис
│  │  │  └─ StoryCard.tsx        # Карточка сторис
│  │  ├─ materials/          # Компоненты материалов
│  │  │  ├─ FilterBar.tsx        # Фильтры (кнопки)
│  │  │  ├─ FilterSidebar.tsx    # Фильтры для мобильных
│  │  │  └─ MaterialCard.tsx     # Карточка материала
│  │  ├─ profile/            # Компоненты профиля
│  │  │  ├─ TransferClientModal.tsx  # Модалка передачи клиента
│  │  │  └─ TransferClientForm.tsx   # Форма передачи клиента
│  │  └─ upload/             # Компоненты загрузки
│  │     ├─ FileUploadZone.tsx   # Drag & drop зона
│  │     └─ FilePreviewList.tsx  # Превью файлов
│  ├─ lib/
│  │  ├─ prisma.ts           # Инициализация Prisma клиента
│  │  ├─ auth.ts             # Конфигурация NextAuth
│  │  ├─ bitrix.ts           # Bitrix24 API клиент
│  │  ├─ sms.ts              # SMS.ru API клиент
│  │  └─ utils.ts            # Утилиты (cn, formatPhoneNumber)
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
  id            String    @id @default(uuid())
  email         String?   @unique
  phone         String?   @unique
  passwordHash  String?
  name          String
  role          Role      @default(PARTNER)
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  clientLeads   ClientLead[]
  accounts      Account[]
  sessions      Session[]
}

model SmsCode {
  id          String   @id @default(uuid())
  phone       String
  code        String
  expiresAt   DateTime
  attempts    Int      @default(0)
  createdAt   DateTime @default(now())
  
  @@index([phone, createdAt])
}

model Material {
  id              String   @id @default(uuid())
  title           String
  description     String?
  fileUrl         String
  thumbnailUrl    String?
  city            String
  propertyType    String
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([city])
  @@index([propertyType])
  @@index([city, propertyType])
}

model ClientLead {
  id          String     @id @default(uuid())
  fullName    String
  phone       String
  city        String
  status      LeadStatus @default(NEW)
  bitrixId    String?
  errorMessage String?
  createdAt   DateTime   @default(now())
  user        User       @relation(fields: [userId], references: [id])
  userId      String
  
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

## Detailed Requirements

### 1. Authentication System

#### Email + Password (Implemented)
- NextAuth.js credentials provider
- bcrypt password hashing (10 rounds)
- JWT strategy with 30-day session

#### SMS Authentication (Required)
- **Provider**: SMS.ru
- **Flow**:
  1. User enters phone number
  2. System generates 6-digit code
  3. Code sent via SMS.ru API
  4. User enters code within 5 minutes
  5. Max 3 attempts per code
  6. Rate limit: max 3 SMS per phone per hour
- **UI**: Phone input with mask (+7 (999) 999-99-99)
- **Error handling**: Invalid code, expired code, max attempts

### 2. Homepage - Stories Carousel

#### Design Reference
- Format like **Samokat** website stories
- Horizontal scrolling cards
- Rectangular cards (3:4 aspect ratio)
- Rounded corners (12px)
- Image with gradient overlay
- Title on overlay (white, bold)
- Snap scrolling behavior
- Touch swipe on mobile
- Arrow buttons on desktop

#### Technical
- Fetch from Story model (isActive=true, order by order)
- Lazy load images
- Responsive: 4-5 cards desktop, 2 tablet, 1.5 mobile
- Click navigates to link or opens modal

### 3. Materials Page

#### Filtering
- **Filter by City**: Button group (horizontal desktop, vertical mobile drawer)
- **Filter by Property Type**: Button group
- **Position**: Top on desktop, sidebar drawer on mobile
- **Behavior**: Immediate filter on click, URL sync (?city=Moscow&type=Apartment)
- **Clear All**: Button to reset filters
- **Active Filters**: Show as removable chips

#### Display
- Grid of Material cards
- Card: thumbnail, title, city, property type
- Click opens file viewer or download
- Pagination or infinite scroll

### 4. Client Transfer Form

#### Form Fields
- **ФИО**: Text input, required, 3-100 chars
- **Телефон**: Masked input (+7 (999) 999-99-99), required
- **Город**: Text input or select, required, 2-50 chars

#### Bitrix24 Integration
- **Webhook**: POST to BITRIX_WEBHOOK_URL + 'crm.lead.add'
- **Payload**:
  ```json
  {
    "fields": {
      "TITLE": "Лид от партнера: {fullName}",
      "NAME": "{firstName}",
      "LAST_NAME": "{lastName}",
      "PHONE": [{"VALUE": "+7XXXXXXXXXX", "VALUE_TYPE": "WORK"}],
      "ADDRESS_CITY": "{city}",
      "SOURCE_ID": "PARTNER_PORTAL",
      "COMMENTS": "Передано через личный кабинет партнера"
    }
  }
  ```
- **Error Handling**: If Bitrix fails, save to DB with status=ERROR and errorMessage
- **Success**: Save bitrixId to ClientLead, status=SENT_TO_BITRIX

#### UX
- Modal form from Profile page
- Validation with Zod
- Loading state during submit
- Success toast notification
- Error toast with details

### 5. Contacts Page - Legal Information

#### Required Content
- **Company Name**: ООО "Профит Премиум"
- **Legal Address**: Полный юридический адрес
- **INN**: ИНН компании (10-12 цифр)
- **KPP**: КПП компании (9 цифр)
- **OGRN**: ОГРН компании (13-15 цифр)
- **Bank Details**: Расчетный счет, БИК, банк
- **Contact Phone**: +7 (XXX) XXX-XX-XX
- **Email**: info@profit-premium.ru
- **Working Hours**: Пн-Пт: 9:00 - 18:00

#### Design
- Clean text page
- Sections with headers
- Professional formatting
- Responsive

### 6. Footer Component

#### Content
- Phone number (clickable tel: link)
- Email (clickable mailto: link)
- Social media icons: Telegram, WhatsApp, VK
- Copyright: © 2026 ООО "Профит Премиум". Все права защищены.
- Links: Политика конфиденциальности, Пользовательское соглашение

#### Design
- Dark background (gray-900)
- White/light text
- Icons 24px with hover effect
- Responsive: 3 columns desktop, stacked mobile
- Padding: py-12 desktop, py-8 mobile

### 7. File Upload (Admin)

#### Requirements
- Drag & drop zone
- Click to select files
- Accepted types: PDF, JPG, JPEG, PNG
- Max size: 50MB per file
- Multiple file upload
- Progress bar
- Thumbnail preview for images
- Metadata form: title, description, city, propertyType

#### Process
1. Select files (validate type/size)
2. Show previews
3. Fill metadata (apply to all or individual)
4. Upload with progress
5. Create Material records

---

## Development Workflow

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
# - NEXTAUTH_SECRET
# - NEXTAUTH_URL
# - SMS_API_KEY (для SMS авторизации)
# - BITRIX_WEBHOOK_URL (для интеграции)

# 3. Инициализация БД
npx prisma migrate dev
npx prisma db seed

# 4. Запуск dev сервера
npm run dev
```

### Test Credentials

- **Admin**: `admin@profit-premium.ru` / `admin123`
- **Partner**: `partner@example.com` / `partner123`

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production bundle |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format:check` | Check Prettier formatting |
| `npm run format:write` | Fix Prettier formatting |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npx prisma studio` | Open Prisma Studio |
| `npx prisma migrate dev` | Create and apply migration |
| `npx prisma db seed` | Seed database with test data |

---

## Code Style

- **TypeScript**: Strict mode включен
- **ESLint**: Конфигурация Next.js + TypeScript
- **Prettier**: 2 пробела, single quotes, trailing commas

### File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Components | PascalCase | `Sidebar.tsx` |
| Pages | page.tsx | `app/materials/page.tsx` |
| API Routes | route.ts | `app/api/materials/route.ts` |
| Utilities | camelCase | `auth.ts` |
| Types | PascalCase | `types/index.ts` |

---

## Security Requirements (Critical for Commercial Project)

### Authentication & Authorization
- ✅ NextAuth.js с JWT стратегией
- ✅ Пароли хешируются bcrypt (10 rounds)
- ✅ Защита роутов через middleware
- ✅ Проверка ролей (ADMIN, MANAGER, PARTNER)
- ✅ Rate limiting на API endpoints (особенно auth)
- ✅ SMS rate limit: max 3 per hour per phone

### File Uploads
- ✅ Валидация MIME-типов (PDF, images only)
- ✅ Проверка размера (max 50MB)
- ✅ Проверка расширения файла
- ✅ Хранение файлов вне public (или с защитой)
- ✅ Доступ только для ADMIN/MANAGER
- ✅ Сканирование на вирусы (опционально, через ClamAV)

### API Security
- ✅ Rate limiting на все endpoints (redis или memory)
- ✅ Input validation с Zod на всех API
- ✅ SQL-защита через Prisma ORM (no raw queries)
- ✅ XSS защита через React escaping
- ✅ CSRF защита через SameSite cookies
- ✅ Security headers (CSP, HSTS, X-Frame-Options)
- ✅ CORS настройка (только разрешенные домены)

### Data Protection
- ✅ Не хранить пароли в plaintext
- ✅ Не логировать sensitive data (телефоны, email)
- ✅ Шифрование в transit (HTTPS only)
- ✅ Backup базы данных (ежедневно)
- ✅ Очистка старых SMS кодов (cron job)

### Secrets Management
- ✅ Никогда не коммитить .env файлы
- ✅ Использовать .env.example с плейсхолдерами
- ✅ Разные secrets для dev/prod
- ✅ Минимум 32 символа для NEXTAUTH_SECRET

---

## Error Handling Standards (Critical for Commercial Project)

### API Errors
- Всегда возвращать JSON с полями:
  ```json
  {
    "error": "Краткое описание ошибки",
    "message": "Подробное сообщение для пользователя",
    "code": "ERROR_CODE",
    "details": {} // Опциональные детали
  }
  ```
- HTTP статусы:
  - 400: Bad Request (validation error)
  - 401: Unauthorized (not authenticated)
  - 403: Forbidden (no permission)
  - 404: Not Found
  - 429: Too Many Requests (rate limit)
  - 500: Internal Server Error

### Client Errors
- Использовать Error Boundaries для React компонентов
- Показывать user-friendly сообщения (не технические детали)
- Логировать ошибки в консоль (dev) или сервис (prod)
- Предоставлять fallback UI при ошибках

### Logging
- Использовать structured logging (JSON format)
- Включать: timestamp, level, message, userId, requestId
- Уровни: error, warn, info, debug
- Не логировать: passwords, tokens, credit cards

---

## Performance Requirements (Critical for Commercial Project)

### Frontend
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Использовать next/image для оптимизации изображений
- Lazy loading для компонентов и изображений
- Code splitting по роутам
- Минимизировать bundle size

### Backend
- API response time < 200ms (p95)
- Использовать кэширование (Redis) для:
  - Список городов и типов недвижимости
  - Сторис (редко меняются)
  - Сессии пользователей
- Database query optimization:
  - Всегда использовать индексы
  - Избегать N+1 queries (использовать include)
  - Пагинация для больших списков (limit/offset)

### Database
- Connection pooling (Prisma handles this)
- Regular VACUUM и ANALYZE
- Индексы на всех foreign keys
- Индексы на часто используемых полях фильтрации

---

## Testing Requirements (Critical for Commercial Project)

### Unit Tests (Recommended: Vitest)
- Тестирование utility functions
- Тестирование API handlers (isolated)
- Тестирование компонентов (React Testing Library)
- Coverage: минимум 70%

### E2E Tests (Playwright) - Required
- Критические пути:
  - Авторизация (email + SMS)
  - Просмотр материалов и фильтрация
  - Передача клиента
  - Загрузка файлов (admin)
- Запускать в CI перед деплоем
- Тестировать на разных viewport (mobile, tablet, desktop)

### Manual Testing Checklist
- [ ] Все ссылки работают
- [ ] Формы валидируют корректно
- [ ] Ошибки API обрабатываются graceful
- [ ] Responsive design на всех устройствах
- [ ] Accessibility (keyboard navigation, screen readers)

---

## Deployment & DevOps (Critical for Commercial Project)

### Docker
- Multi-stage build для оптимизации размера
- Non-root user в контейнере
- Health check endpoint
- Graceful shutdown handling

### Environment Variables (Production)
```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/profit_premium?schema=public

# Auth
NEXTAUTH_URL=https://profit-premium.ru
NEXTAUTH_SECRET=prod-secret-min-32-chars-long

# SMS
SMS_API_KEY=prod-sms-api-key
SMS_PROVIDER=smsru

# Bitrix24
BITRIX_WEBHOOK_URL=https://company.bitrix24.ru/rest/1/webhook-token/

# Storage
UPLOAD_DIR=/app/uploads
MAX_FILE_SIZE=52428800

# Redis (for rate limiting & cache)
REDIS_URL=redis://localhost:6379

# Logging
LOG_LEVEL=info
```

### Backup Strategy
- **Database**: Ежедневные автоматические бэкапы (pg_dump)
- **Files**: Ежедневный backup загруженных файлов
- **Retention**: Хранить бэкапы за последние 30 дней
- **Testing**: Ежемесячное тестирование восстановления из бэкапа

### Monitoring & Alerts
- Application logs (structured JSON)
- Error tracking (Sentry или аналог)
- Performance monitoring (Next.js Analytics или APM)
- Uptime monitoring (Pingdom или аналог)
- Alerts на: 500 errors, high latency, downtime

### CI/CD Pipeline
```yaml
# .github/workflows/ci.yml
name: CI/CD
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm run test:e2e
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: # Deploy to production
```

---

## API Documentation Standards

### Endpoint Documentation Format
```typescript
/**
 * POST /api/materials
 * 
 * Create new material (Admin/Manager only)
 * 
 * @body {
 *   title: string (required, 3-200 chars)
 *   description?: string (optional, max 1000 chars)
 *   city: string (required)
 *   propertyType: string (required)
 *   file: File (required, PDF or image, max 50MB)
 * }
 * 
 * @returns {
 *   id: string
 *   title: string
 *   fileUrl: string
 *   createdAt: string
 * }
 * 
 * @errors
 * 400 - Validation error
 * 401 - Unauthorized
 * 403 - Forbidden (not admin/manager)
 * 413 - File too large
 * 500 - Server error
 */
```

### Response Format
Все API ответы должны следовать единому формату:
```typescript
// Success
{
  success: true,
  data: { ... },
  meta: { // для списков
    page: 1,
    limit: 20,
    total: 100
  }
}

// Error
{
  success: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Invalid input data',
    details: { field: 'email', issue: 'Invalid format' }
  }
}
```

---

## Git Workflow (Critical for Commercial Project)

### Branching Strategy
- `main` - production ready code
- `develop` - development branch (optional)
- `feature/*` - новые фичи
- `fix/*` - багфиксы
- `hotfix/*` - срочные фиксы для продакшена

### Commit Messages
Формат: `type(scope): message`

Types:
- `feat`: новая функциональность
- `fix`: исправление бага
- `docs`: документация
- `style`: форматирование (без изменения кода)
- `refactor`: рефакторинг
- `test`: тесты
- `chore`: обслуживание (deps, config)

Examples:
- `feat(auth): add SMS authentication`
- `fix(materials): correct filter by city`
- `docs(api): add endpoint documentation`

### Pull Request Requirements
- [ ] Все тесты проходят
- [ ] Код review от минимум 1 человека
- [ ] Нет конфликтов с main
- [ ] Соответствует code style
- [ ] Документация обновлена (если нужно)

---

## Accessibility (a11y) Requirements

### Standards
- Соответствие WCAG 2.1 Level AA
- Поддержка keyboard navigation
- ARIA labels для интерактивных элементов
- Alt text для изображений
- Цветовой контраст минимум 4.5:1

### Implementation
- Использовать семантические HTML теги
- Focus indicators для всех интерактивных элементов
- Skip links для навигации
- Screen reader friendly формы (label связан с input)
- Не полагаться только на цвет для передачи информации

---

## Universal Agent Operating Rules

These rules apply to any AI coding agent working in this repository.
Follow them before relying on any project-specific context below.

### Mission

Your goal is to make correct, minimal, safe, and verifiable progress.
Prefer reliable execution over fast guessing.
Do not pretend work was completed if it was not actually verified.

### Default working style

- Read relevant files before making changes.
- Infer from the repository first, ask only when uncertainty materially affects correctness.
- Prefer small, reversible changes over broad refactors.
- Reuse existing project patterns before introducing new ones.
- Keep outputs concrete, structured, and easy to review.

### Task classification

For every new task, first classify it mentally as one of:
- Fully specified
- Partially specified
- Ambiguous
- High-risk

Treat a task as high-risk if it affects authentication, payments, data deletion, production config, secrets, infra, security, or public APIs.

### Clarification rule

Do not rush into implementation when the task is underspecified.

Before writing code, check whether the following are clear enough:
- goal and expected outcome
- target behavior / user flow
- files or area likely involved
- constraints and non-goals
- acceptance criteria
- validation method

If critical information is missing, ask a short set of high-value clarification questions first.
Prefer 3-7 concise questions in one round.
If the repository already provides enough evidence, proceed without asking.

### Assumption rule

When you must proceed with incomplete information:
- make the safest reasonable assumption;
- state it explicitly;
- avoid irreversible or sweeping changes based on that assumption.

Never hide important assumptions.

### Planning rule

For non-trivial tasks, think in phases:
1. Understand the current implementation
2. Identify the minimal change
3. Implement
4. Validate
5. Summarize outcome and risks

Do not dump large code changes without first understanding the surrounding code.

### Change boundaries

- Do not refactor unrelated code unless it blocks the task.
- Do not rename files, move modules, or change architecture without a clear reason.
- Do not add dependencies unless necessary and justified.
- Do not remove comments, tests, configs, or files unless you understand why they exist.

### Source of truth

When sources conflict, prefer:
1. actual code and tests
2. active configuration files
3. repository docs
4. comments and stale notes

Treat documentation as potentially outdated if it conflicts with code.

### Validation rule

A task is not complete until it is validated appropriately.

Use the strongest available validation:
- existing tests
- typecheck
- lint
- build
- runtime verification
- browser or E2E verification if UI behavior is involved

Never claim success based only on reasoning when validation was possible but not performed.

### Failure handling

If a tool, server, test, build, or external integration fails:
- say exactly what failed;
- explain the effect on confidence;
- continue with the best available fallback;
- do not stop if useful progress is still possible.

Be resilient, not brittle.

### Fallback rule

When the ideal tool is unavailable, fall back in this order when possible:
1. repository inspection
2. static analysis
3. local commands
4. existing tests
5. narrow manual reasoning

Explicitly note when confidence is reduced.

### Safety rules

Never expose or commit:
- secrets
- tokens
- private keys
- `.env` files with real values
- credentials
- production-only internal URLs if they are sensitive

Before any commit or push, verify that ignored files, generated junk, logs, caches, screenshots, build artifacts, and secret-bearing files are not accidentally included.

### Git and publish rules

Before commit or push:
- inspect changed files;
- verify `.gitignore`;
- confirm that only intended files are included;
- do not publish broken, unverified, or risky changes.

If a push is unsafe, say so clearly and explain why.

### Communication format

When reporting progress, prefer this structure:

#### Status
- DONE
- IN PROGRESS
- BLOCKED
- FALLBACK USED

#### Findings
Concrete observations only.

#### Changes made
List meaningful file changes and why.

#### Validation
State what was checked, how it was checked, and what confidence level remains.

#### Open risks
List anything not fully verified.

### Quality bar

Good output is:
- correct
- minimal
- understandable
- consistent with the repo
- validated
- safe to review

Fast but unverified output is not good output.

### Anti-patterns

Do not:
- hallucinate files, commands, APIs, or test results;
- claim a tool was used when it was not;
- claim code is production-ready without validation;
- make speculative architectural changes from a vague prompt;
- silently skip requested steps;
- keep retrying the same failed action without changing strategy.

### Completion rule

Only consider the task complete when one of these is true:
1. the requested change was made and validated with reasonable confidence;
2. the change could not be completed, and the exact blocker, impact, and next step are clearly stated.

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
| 2026-04-08 | Agent | Updated with detailed requirements from specification |
| 2026-04-08 | Agent | Database schema updated with indexes, migrations applied, test data seeded |

---

*End of AGENTS.md*
