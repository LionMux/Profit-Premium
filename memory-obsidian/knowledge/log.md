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
