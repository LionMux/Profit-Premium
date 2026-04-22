# Log

Хронологический журнал операций вики.

## [2026-04-17] ingest | Перенос изменений из profit-premium-new

- **slug:** `profit-premium-new-merge`
- **pages touched:**
  - [[concepts/profit-premium-ui-redesign]] — новая страница
  - [[concepts/nextjs-server-client-boundary]] — новая страница
  - [[concepts/lucide-icon-map-pattern]] — новая страница
  - [[connections/merge-problems-and-solutions]] — новая страница
- **сводка:**
  - Перенесено 17 файлов из `profit-premium-new` в основной проект (6 новых компонентов, 4 обновлённых компонента, 6 обновлённых страниц, 1 обновлённый CSS)
  - Исправлена критическая ошибка: передача Lucide-иконок из Server Components в Client Components
  - Применён паттерн `iconMap` с строковыми названиями иконок
  - Сборка проходит успешно (`npm run build`)
  - Папка `profit-premium-new` удалена

## [2026-04-23] session | Оживление админки, API сторис, локальные изображения

- **slug:** `admin-functional-stories-api-local-images`
- **pages touched:**
  - [[concepts/nextauth-url-port-mismatch]] — новая страница
  - [[concepts/stories-api-architecture]] — новая страница
  - [[concepts/unsplash-to-local-images]] — новая страница
- **сводка:**
  - Создан `.env.local` с `DATABASE_URL` — устранена ошибка "Environment variable not found"
  - Добавлены 6 сторис с локальными изображениями недвижимости в `public/stories/`
  - Созданы API-роуты: `GET/POST /api/stories`, `PATCH/DELETE /api/stories/[id]`
  - Оживлён `UploadMaterialCard` — реальная двухэтапная загрузка файлов
  - Убраны дублирующие кнопки с `/dashboard` и `/admin` (кнопки, которые есть в сайдбаре)
  - Убрана CRM-форма «Передать клиента» с дашборда
  - Заменён мок `TransferClientDialog` на рабочий `TransferClientForm` на `/profile`
  - Все Unsplash-URL заменены на локальные изображения
  - `next.config.js`: `images.unoptimized: true` — отключена оптимизация изображений Next.js
  - Добавлены placeholder-файлы в `public/uploads/` для seed-данных
  - Сборка проходит успешно, dev-сервер стабилен на порту 3000
  - Создан PR на GitHub: `fix/admin-and-dashboard`
