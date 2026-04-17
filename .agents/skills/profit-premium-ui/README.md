# Profit-Premium UI Skill

AI Skill для генерации production-ready UI компонентов для проекта Profit-Premium — закрытого личного кабинета для партнеров-агентов по недвижимости.

## 📋 Содержание

- [Структура](#структура)
- [Установка](#установка)
- [Использование](#использование)
- [Каскад промптов](#каскад-промптов)
- [Компоненты](#компоненты)
- [Технологии](#технологии)

## 📁 Структура

```
profit-premium-ui/
├── SKILL.md                          # Главный файл skill
├── README.md                         # Этот файл
├── assets/
│   └── templates/                    # Шаблоны компонентов
│       ├── stories-carousel.tsx      # Samokat-style карусель
│       ├── material-card.tsx         # Карточка материала
│       ├── filter-bar.tsx            # Фильтры (desktop + mobile)
│       ├── sms-auth-form.tsx         # SMS авторизация
│       ├── transfer-client-form.tsx  # Форма передачи клиента
│       ├── file-upload-zone.tsx      # Drag & drop загрузка
│       ├── phone-input.tsx           # Маскированный телефон
│       ├── footer.tsx                # Footer с контактами
│       ├── right-sidebar.tsx         # Правый sidebar
│       ├── form-template.tsx         # Универсальная форма
│       ├── server-page-template.tsx  # Server Component
│       └── client-component-template.tsx # Client Component
└── references/                       # Справочники
    ├── css-variables.md              # CSS переменные
    ├── tailwind-patterns.md          # Tailwind паттерны
    └── component-patterns.md         # Паттерны компонентов
```

## 🚀 Установка

1. **Установите зависимости проекта:**

```bash
npm install react-hook-form zod @hookform/resolvers/zod react-input-mask react-dropzone
```

2. **Убедитесь, что shadcn/ui компоненты установлены:**

```bash
npx shadcn add button input card dialog badge avatar sheet scroll-area separator progress
```

3. **Скопируйте skill в ваш проект:**

```bash
# Скопируйте папку profit-premium-ui в корень проекта
cp -r profit-premium-ui/.skill ./.skill
```

## 💡 Использование

### Базовый пример

Просто попросите AI сгенерировать компонент:

```
"Создай StoriesCarousel для главной страницы"
```

### Продвинутый пример

```
"Создай форму для передачи клиента с полями ФИО, телефон, город.
 Используй react-hook-form + zod для валидации.
 Телефон должен быть с маской +7 (999) 999-99-99.
 Форма должна отправлять данные на /api/client-leads"
```

### Контекстно-зависимая генерация

Skill автоматически определяет тип компонента и применяет правильный шаблон:

- **"Stories carousel"** → использует `stories-carousel.tsx`
- **"Material card"** → использует `material-card.tsx`
- **"Filter bar"** → использует `filter-bar.tsx`
- **"SMS form"** → использует `sms-auth-form.tsx`
- **"Transfer client"** → использует `transfer-client-form.tsx`
- **"Upload zone"** → использует `file-upload-zone.tsx`
- **"Footer"** → использует `footer.tsx`
- **"Sidebar"** → использует `right-sidebar.tsx`

## 🎯 Каскад промптов

### Промпт 1: Stories Carousel

```markdown
Создай компонент StoriesCarousel для главной страницы.

Требования:

- Горизонтальный скролл с snap
- Карточки 3:4 aspect ratio
- Ширина: 192px mobile, 224px desktop
- Градиент overlay снизу
- Заголовок белым текстом на overlay
- Touch swipe на мобильных
- Кнопки навигации на десктопе (показывать при hover)
- Данные приходят через props: stories: Story[]

Используй:

- next/image для оптимизации
- Tailwind для стилизации
- scroll-snap-type-x-mandatory
```

### Промпт 2: Material Card

```markdown
Создай компонент MaterialCard для отображения презентаций.

Требования:

- Thumbnail: aspect-video
- Fallback иконка для PDF (FileText)
- Fallback для изображений
- Title: font-semibold, line-clamp-1
- Description: text-sm text-muted-foreground, line-clamp-2
- Badges: город и тип недвижимости
- Hover: shadow-lg
- Click: открыть файл в новой вкладке

Interface:
interface Material {
id: string;
title: string;
description?: string;
fileUrl: string;
thumbnailUrl?: string;
city: string;
propertyType: string;
createdAt: Date;
}
```

### Промпт 3: Filter Bar

```markdown
Создай компонент FilterBar для страницы материалов.

Требования:

- Desktop: горизонтальные кнопки
- Mobile: Sheet (drawer) слева
- Фильтры по городу и типу недвижимости
- Активный фильтр: bg-primary
- Неактивный: bg-muted
- URL sync: ?city=X&type=Y
- Кнопка "Все" для сброса
- Показывать количество активных фильтров на мобильном

Props:
interface FilterBarProps {
cities: string[];
propertyTypes: string[];
activeCity?: string;
activeType?: string;
}
```

### Промпт 4: SMS Auth Form

```markdown
Создай компонент SmsAuthForm для авторизации по SMS.

Требования:

- Шаг 1: ввод телефона с маской +7 (999) 999-99-99
- Шаг 2: ввод 6-значного кода
- Таймер повторной отправки (60 сек)
- Кнопка "Изменить номер" для возврата
- Валидация через zod
- Toast уведомления
- API: POST /api/auth/sms/send, POST /api/auth/sms/verify

Используй:

- react-hook-form
- zod
- react-input-mask
- shadcn/ui components
```

### Промпт 5: Transfer Client Form

```markdown
Создай компонент TransferClientForm для передачи клиента в CRM.

Поля:

- ФИО (обязательное, min 3 символа, только буквы)
- Телефон (обязательное, маска +7 (999) 999-99-99)
- Город (обязательное, min 2 символа)

Требования:

- Валидация через zod
- Отправка на POST /api/client-leads
- Toast уведомления (успех/ошибка)
- Loading state на кнопке
- Очистка формы после успеха

Используй react-hook-form + zod.
```

### Промпт 6: File Upload Zone

```markdown
Создай компонент FileUploadZone для загрузки презентаций.

Требования:

- Drag & drop зона
- Клик для выбора файлов
- Принимаемые типы: PDF, JPG, PNG
- Макс размер: 50MB
- Превью для изображений
- Иконка PDF для документов
- Progress bar
- Форма метаданных: title, description, city, propertyType
- Множественная загрузка

Используй:

- react-dropzone
- shadcn/ui Progress
```

### Промпт 7: Footer

```markdown
Создай компонент Footer с контактной информацией.

Секции:

1. Company Info:
   - Название: ООО "Профит Премиум"
   - Описание: Закрытый личный кабинет для партнеров
   - Адрес: г. Москва, ул. Примерная, д. 123

2. Contacts:
   - Телефон: +7 (495) 123-45-67 (кликабельный)
   - Email: info@profit-premium.ru (кликабельный)
   - Часы: Пн-Пт: 9:00 - 18:00

3. Social Links:
   - Telegram, WhatsApp, VK (иконки)

4. Bottom Bar:
   - Copyright © 2024
   - Политика конфиденциальности
   - Пользовательское соглашение

Дизайн:

- Фон: bg-gray-900
- Текст: text-gray-300
- 3 колонки desktop, stacked mobile
```

### Промпт 8: Right Sidebar

```markdown
Создай компонент Sidebar (правый) для dashboard layout.

Требования:

- Фиксирован справа (right-0)
- Ширина: 256px
- Высота: 100vh
- User info (avatar, name, email, role)
- Навигация: Главная, Материалы, Профиль, Контакты
- Активный пункт: bg-primary
- Кнопка "Выйти" внизу

Props:
interface SidebarProps {
user: {
name: string;
email: string;
role: 'ADMIN' | 'MANAGER' | 'PARTNER';
};
}

Используй:

- next/navigation usePathname
- shadcn/ui Avatar
- lucide-react иконки
```

## 🧩 Компоненты

### Готовые шаблоны

| Компонент          | Описание                   | Файл                            |
| ------------------ | -------------------------- | ------------------------------- |
| StoriesCarousel    | Samokat-style карусель     | `stories-carousel.tsx`          |
| MaterialCard       | Карточка презентации       | `material-card.tsx`             |
| FilterBar          | Фильтры (desktop + mobile) | `filter-bar.tsx`                |
| SmsAuthForm        | SMS авторизация            | `sms-auth-form.tsx`             |
| TransferClientForm | Форма передачи клиента     | `transfer-client-form.tsx`      |
| FileUploadZone     | Drag & drop загрузка       | `file-upload-zone.tsx`          |
| PhoneInput         | Маскированный телефон      | `phone-input.tsx`               |
| Footer             | Footer с контактами        | `footer.tsx`                    |
| Sidebar            | Правый sidebar             | `right-sidebar.tsx`             |
| FormTemplate       | Универсальная форма        | `form-template.tsx`             |
| ServerPage         | Server Component           | `server-page-template.tsx`      |
| ClientComponent    | Client Component           | `client-component-template.tsx` |

## 🛠 Технологии

### Обязательный стек

- **Next.js 14** (App Router)
- **TypeScript 5.x** (strict mode)
- **Tailwind CSS 3.x**
- **shadcn/ui** (base components)

### Формы и валидация

- **react-hook-form** — управление формами
- **zod** — валидация схем
- **@hookform/resolvers/zod** — интеграция
- **react-input-mask** — маски ввода

### UI библиотеки

- **@radix-ui/react-\*** — примитивы
- **lucide-react** — иконки
- **class-variance-authority** — варианты компонентов
- **clsx + tailwind-merge** — утилиты классов

### Файлы

- **react-dropzone** — drag & drop
- **browser-image-compression** — сжатие (опционально)

## 📚 Справочники

### CSS Variables

См. `references/css-variables.md` — полный набор CSS переменных проекта.

### Tailwind Patterns

См. `references/tailwind-patterns.md` — часто используемые комбинации классов.

### Component Patterns

См. `references/component-patterns.md` — архитектурные паттерны компонентов.

## ✅ Чеклист качества

Перед использованием сгенерированного компонента:

- [ ] Компонент использует TypeScript (strict mode)
- [ ] Все props типизированы
- [ ] Используются CSS переменные проекта
- [ ] Применяются Tailwind паттерны из справочника
- [ ] Для форм: react-hook-form + zod
- [ ] Обработаны loading и error состояния
- [ ] Компонент responsive (mobile-first)
- [ ] Доступность (ARIA labels, keyboard navigation)
- [ ] Нет дублирования кода
- [ ] Следует принципам DRY и KISS

## 🎨 Дизайн система

### Цвета

- **Primary**: `--primary` (черный) / `--primary-foreground` (белый)
- **Secondary**: `--secondary` (светло-серый)
- **Muted**: `--muted` (фон для hover)
- **Accent**: `--accent` (выделение)
- **Destructive**: `--destructive` (красный для ошибок)

### Типографика

- **Заголовки**: text-2xl font-bold tracking-tight
- **Подзаголовки**: text-xl font-semibold
- **Основной текст**: text-base
- **Вторичный текст**: text-sm text-muted-foreground

### Отступы

- **Компоненты**: gap-4, space-y-4
- **Карточки**: p-6
- **Кнопки**: px-4 py-2

### Скругление

- **Карточки**: rounded-xl (12px)
- **Кнопки**: rounded-md (6px)
- **Инпуты**: rounded-md

## 📝 Примеры использования

### Stories Carousel

```tsx
import { StoriesCarousel } from '@/components/stories/StoriesCarousel';

const stories = [
  {
    id: '1',
    imageUrl: '/uploads/story1.jpg',
    title: 'Новый объект в Москве',
    link: '/materials/1',
  },
  // ...
];

<StoriesCarousel stories={stories} />;
```

### Material Card

```tsx
import { MaterialCard } from '@/components/materials/MaterialCard';

const material = {
  id: '1',
  title: 'Презентация ЖК Солнечный',
  description: 'Жилой комплекс бизнес-класса',
  fileUrl: '/uploads/presentation.pdf',
  thumbnailUrl: '/uploads/thumb.jpg',
  city: 'Москва',
  propertyType: 'Квартира',
  createdAt: new Date(),
};

<MaterialCard material={material} />;
```

### Filter Bar

```tsx
import { FilterBar } from '@/components/materials/FilterBar';

<FilterBar
  cities={['Москва', 'СПб', 'Казань']}
  propertyTypes={['Квартира', 'Дом', 'Офис']}
  activeCity={searchParams.city}
  activeType={searchParams.type}
/>;
```

### SMS Auth Form

```tsx
import { SmsAuthForm } from '@/components/auth/SmsAuthForm';

<SmsAuthForm onSuccess={() => router.push('/')} />;
```

### Transfer Client Form

```tsx
import { TransferClientForm } from '@/components/profile/TransferClientForm';

<TransferClientForm onSuccess={() => setOpen(false)} />;
```

### File Upload Zone

```tsx
import { FileUploadZone } from '@/components/upload/FileUploadZone';

<FileUploadZone
  onUpload={async (files, metadata) => {
    // Upload logic
  }}
/>;
```

## 🔧 Дополнительно

### Настройка VS Code

Рекомендуемые расширения:

- Tailwind CSS IntelliSense
- TypeScript Hero
- ESLint
- Prettier

### Сниппеты

Добавьте в `.vscode/snippets.code-snippets`:

```json
{
  "Form Component": {
    "prefix": "form-component",
    "body": [
      "'use client';",
      "",
      "import { useForm } from 'react-hook-form';",
      "import { zodResolver } from '@hookform/resolvers/zod';",
      "import { z } from 'zod';",
      "import { Button } from '@/components/ui/button';",
      "import { Input } from '@/components/ui/input';",
      "import { Label } from '@/components/ui/label';",
      "",
      "const schema = z.object({",
      "  $1: z.string().min(1, 'Обязательное поле'),",
      "});",
      "",
      "type FormData = z.infer<typeof schema>;",
      "",
      "export function $2Form() {",
      "  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({",
      "    resolver: zodResolver(schema),",
      "  });",
      "",
      "  async function onSubmit(data: FormData) {",
      "    console.log(data);",
      "  }",
      "",
      "  return (",
      "    <form onSubmit={handleSubmit(onSubmit)}>",
      "      {/* Form fields */}",
      "    </form>",
      "  );",
      "}"
    ]
  }
}
```

## 📞 Поддержка

Если у вас есть вопросы или предложения по улучшению skill:

1. Проверьте справочники в `references/`
2. Изучите шаблоны в `assets/templates/`
3. Обратитесь к документации shadcn/ui

## 📄 Лицензия

MIT License — свободное использование в любых проектах.

---

**Важно**: Этот skill разработан специально для проекта Profit-Premium. Все компоненты следуют единой дизайн системе и архитектурным принципам проекта.
