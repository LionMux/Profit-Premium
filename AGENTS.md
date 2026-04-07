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
2. **Главная**: блок "сторис" (карусель карточек) + навигация
3. **Материалы**: фильтрация презентаций по городу и типу недвижимости
4. **Личный кабинет**: профиль + кнопка "Передать клиента" → форма → Bitrix24
5. **Админка**: загрузка новых презентаций (для менеджеров)

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
│  │  │  └─ login/page.tsx   # Страница входа
│  │  ├─ (dashboard)/        # Группа: личный кабинет
│  │  │  ├─ page.tsx         # Главная (сторис)
│  │  │  ├─ layout.tsx       # Layout с боковым меню
│  │  │  ├─ materials/       # Страница материалов
│  │  │  ├─ profile/         # Личный кабинет
│  │  │  └─ contacts/        # Юридическая информация
│  │  ├─ admin/              # Админ-панель
│  │  ├─ api/                # API Routes
│  │  │  ├─ auth/[...nextauth]/route.ts  # NextAuth endpoint
│  │  │  ├─ materials/route.ts           # CRUD материалов
│  │  │  ├─ upload/route.ts              # Загрузка файлов
│  │  │  └─ client-leads/route.ts        # Форма "Передать клиента"
│  │  ├─ layout.tsx          # Корневой layout
│  │  └─ page.tsx            # Редирект на /login
│  ├─ components/
│  │  ├─ ui/                 # UI компоненты (button, input, card)
│  │  ├─ layout/             # Layout компоненты
│  │  │  ├─ Sidebar.tsx      # Боковое меню (справа)
│  │  │  └─ Header.tsx       # Шапка с пользователем
│  │  └─ auth/               # Компоненты авторизации
│  ├─ lib/
│  │  ├─ prisma.ts           # Инициализация Prisma клиента
│  │  ├─ auth.ts             # Конфигурация NextAuth
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
}

model ClientLead {
  id          String     @id @default(uuid())
  fullName    String
  phone       String
  city        String
  status      LeadStatus @default(NEW)
  bitrixId    String?
  createdAt   DateTime   @default(now())
  user        User       @relation(fields: [userId], references: [id])
  userId      String
}

model Story {
  id        String   @id @default(uuid())
  imageUrl  String
  title     String
  link      String?
  order     Int      @default(0)
  isActive  Boolean  @default(true)
}
```

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
# Заполнить: DATABASE_URL, NEXTAUTH_SECRET

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

---

## Security Considerations

### Authentication
- ✅ NextAuth.js с JWT стратегией
- ✅ Пароли хешируются bcrypt (10 rounds)
- ✅ Защита роутов через middleware
- ✅ Проверка ролей (ADMIN, MANAGER, PARTNER)

### File Uploads
- ✅ Валидация MIME-типов (PDF, images)
- ✅ Проверка размера (max 50MB)
- ✅ Доступ только для ADMIN/MANAGER

### API Security
- ✅ Rate limiting (TODO)
- ✅ Input validation с Zod
- ✅ SQL-защита через Prisma ORM

---

## TODO / Future Improvements

1. **SMS авторизация**: Интеграция с SMS.ru или Twilio
2. **Bitrix24 интеграция**: Отправка лидов в CRM
3. **Rate limiting**: Защита от brute-force
4. **Email уведомления**: Подтверждение регистрации
5. **Тесты**: Добавить unit-тесты (Vitest/Jest)

---

## Useful Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Prisma ORM Docs](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Playwright Testing](https://playwright.dev/)

---
---

# Universal Agent Operating Rules

These rules apply to any AI coding agent working in this repository.
Follow them before relying on any project-specific context below.

## Mission

Your goal is to make correct, minimal, safe, and verifiable progress.
Prefer reliable execution over fast guessing.
Do not pretend work was completed if it was not actually verified.

## Default working style

- Read relevant files before making changes.
- Infer from the repository first, ask only when uncertainty materially affects correctness.
- Prefer small, reversible changes over broad refactors.
- Reuse existing project patterns before introducing new ones.
- Keep outputs concrete, structured, and easy to review.

## Task classification

For every new task, first classify it mentally as one of:
- Fully specified
- Partially specified
- Ambiguous
- High-risk

Treat a task as high-risk if it affects authentication, payments, data deletion, production config, secrets, infra, security, or public APIs.

## Clarification rule

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

## Assumption rule

When you must proceed with incomplete information:
- make the safest reasonable assumption;
- state it explicitly;
- avoid irreversible or sweeping changes based on that assumption.

Never hide important assumptions.

## Planning rule

For non-trivial tasks, think in phases:
1. Understand the current implementation
2. Identify the minimal change
3. Implement
4. Validate
5. Summarize outcome and risks

Do not dump large code changes without first understanding the surrounding code.

## Change boundaries

- Do not refactor unrelated code unless it blocks the task.
- Do not rename files, move modules, or change architecture without a clear reason.
- Do not add dependencies unless necessary and justified.
- Do not remove comments, tests, configs, or files unless you understand why they exist.

## Source of truth

When sources conflict, prefer:
1. actual code and tests
2. active configuration files
3. repository docs
4. comments and stale notes

Treat documentation as potentially outdated if it conflicts with code.

## Validation rule

A task is not complete until it is validated appropriately.

Use the strongest available validation:
- existing tests
- typecheck
- lint
- build
- runtime verification
- browser or E2E verification if UI behavior is involved

Never claim success based only on reasoning when validation was possible but not performed.

## Failure handling

If a tool, server, test, build, or external integration fails:
- say exactly what failed;
- explain the effect on confidence;
- continue with the best available fallback;
- do not stop if useful progress is still possible.

Be resilient, not brittle.

## Fallback rule

When the ideal tool is unavailable, fall back in this order when possible:
1. repository inspection
2. static analysis
3. local commands
4. existing tests
5. narrow manual reasoning

Explicitly note when confidence is reduced.

## Safety rules

Never expose or commit:
- secrets
- tokens
- private keys
- `.env` files with real values
- credentials
- production-only internal URLs if they are sensitive

Before any commit or push, verify that ignored files, generated junk, logs, caches, screenshots, build artifacts, and secret-bearing files are not accidentally included.

## Git and publish rules

Before commit or push:
- inspect changed files;
- verify `.gitignore`;
- confirm that only intended files are included;
- do not publish broken, unverified, or risky changes.

If a push is unsafe, say so clearly and explain why.

## Communication format

When reporting progress, prefer this structure:

### Status
- DONE
- IN PROGRESS
- BLOCKED
- FALLBACK USED

### Findings
Concrete observations only.

### Changes made
List meaningful file changes and why.

### Validation
State what was checked, how it was checked, and what confidence level remains.

### Open risks
List anything not fully verified.

## Quality bar

Good output is:
- correct
- minimal
- understandable
- consistent with the repo
- validated
- safe to review

Fast but unverified output is not good output.

## Anti-patterns

Do not:
- hallucinate files, commands, APIs, or test results;
- claim a tool was used when it was not;
- claim code is production-ready without validation;
- make speculative architectural changes from a vague prompt;
- silently skip requested steps;
- keep retrying the same failed action without changing strategy.

## Completion rule

Only consider the task complete when one of these is true:
1. the requested change was made and validated with reasonable confidence;
2. the change could not be completed, and the exact blocker, impact, and next step are clearly stated.

---

## Changelog

| Date | Author | Changes |
|------|--------|---------|
| 2026-04-07 | Agent | Project initialized with Next.js, Prisma, NextAuth |

---

*End of AGENTS.md*
