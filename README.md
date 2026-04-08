# Profit Premium

Закрытый личный кабинет для партнеров-агентов по недвижимости.

## Функциональность

- **Авторизация**: Email + пароль или SMS-код (SMS.ru)
- **Материалы**: Презентации объектов с фильтрацией по городу и типу недвижимости
- **Передача клиентов**: Форма для передачи лидов в CRM (Bitrix24)
- **Админ-панель**: Загрузка новых материалов
- **Сторис**: Карусель новостей на главной странице

## Технологии

- Next.js 14 (App Router) + TypeScript 5
- Tailwind CSS + shadcn/ui
- Prisma ORM + PostgreSQL
- NextAuth.js v5 (JWT)
- SMS.ru API (SMS-аутентификация)
- Playwright (E2E тесты)
- Docker + Docker Compose

## Установка

```bash
# Клонирование
git clone https://github.com/LionMux/Profit-Premium.git
cd profit-premium

# Установка зависимостей
npm install

# Настройка окружения
cp .env.example .env.local
# Заполните переменные окружения:
# - DATABASE_URL
# - NEXTAUTH_SECRET
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
# Запуск с Docker Compose
docker-compose up -d

# Применение миграций
docker-compose exec app npx prisma migrate deploy
```

## Тестовые данные

- **Admin**: admin@profit-premium.ru / admin123
- **Partner**: partner@example.com / partner123

## Структура проекта

```
profit-premium/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React компоненты
│   ├── lib/             # Утилиты и API клиенты
│   └── types/           # TypeScript типы
├── prisma/              # Схема БД и миграции
├── public/              # Статические файлы
└── docker-compose.yml   # Production деплой
```

## Команды

| Команда                  | Описание             |
| ------------------------ | -------------------- |
| `npm run dev`            | Запуск dev сервера   |
| `npm run build`          | Сборка production    |
| `npm run lint`           | Проверка ESLint      |
| `npm run test:e2e`       | E2E тесты Playwright |
| `npx prisma studio`      | Prisma Studio        |
| `npx prisma migrate dev` | Создание миграции    |

## Лицензия

MIT License (Copyright 2026 Лев Мухачев)
