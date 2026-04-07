# Profit Premium

Закрытый личный кабинет для партнеров-агентов по недвижимости.

## Функциональность

- **Авторизация**: Email + пароль или SMS-код
- **Материалы**: Презентации объектов с фильтрацией по городу и типу недвижимости
- **Передача клиентов**: Форма для передачи лидов в CRM (Bitrix24)
- **Админ-панель**: Загрузка новых материалов

## Технологии

- Next.js 14 + TypeScript
- Tailwind CSS + shadcn/ui
- Prisma + PostgreSQL
- NextAuth.js
- Playwright (E2E тесты)

## Установка

```bash
# Клонирование
git clone https://github.com/LionMux/Profit-Premium.git
cd profit-premium

# Установка зависимостей
npm install

# Настройка окружения
cp .env.example .env.local
# Заполните переменные окружения

# Инициализация базы данных
npx prisma migrate dev
npx prisma db seed

# Запуск dev сервера
npm run dev
```

## Тестовые данные

- **Admin**: admin@profit-premium.ru / admin123
- **Partner**: partner@example.com / partner123

## Лицензия

MIT License (Copyright 2026 Лев Мухачев)
