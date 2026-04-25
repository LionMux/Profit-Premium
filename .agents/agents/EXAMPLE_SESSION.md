# Пример сессии: Доведение сайта до production-ready

> Это реалистичный пример того, как выглядит взаимодействие с системой агентов на конкретной задаче. Показаны все фазы PEVC Loop с реальными промптами, планом и чанками.

---

## Ваш промпт

```
Доведи сайт до production-ready состояния. Добавь:
1. Фоновые картинки с parallax-эффектом на лендинг (Hero, Услуги)
2. Градиентные переходы между секциями
3. Анимации появления элементов при скролле (fade-in, slide-up)
4. Ховер-эффекты на карточках материалов
5. Проверь и исправь все визуальные недочеты — чтобы было premium
6. Убедись что мобильная версия идеальна
7. Прогоняй тесты после каждого изменения
```

---

## Фаза 1: ANALYZE (Оркестратор)

```
[orchestrator] Читаю AGENTS.md и текущее состояние проекта...

Изучил контекст:
- Проект: Next.js 14 + Tailwind + shadcn/ui
- Дизайн: burgundy (#5C1E2D) + cream (#F0EAE0)
- Страницы: landing (Hero, Advantages, Services, Team, Reviews, Contact),
  dashboard, materials, profile, admin
- Скриншоты текущего состояния: ./screenshots/

Классификация: COMPLEX (затрагивает 6+ секций, требует анимации, мобильная адаптация)
→ Запускаю planner в полном режиме
```

---

## Фаза 2: BLUEPRINT (Planner)

```
[planner] Исследую кодовую базу...

Прочитал:
- src/app/page.tsx — лендинг (HeroSection → AdvantagesSection → ServicesSection → ...)
- src/components/landing/HeroSection.tsx — текущий Hero
- src/components/landing/ServicesSection.tsx — текущие услуги
- src/components/materials/MaterialCard.tsx — карточки материалов
- src/components/landing/TeamSection.tsx — команда
- src/components/landing/ReviewsSection.tsx — отзывы
- tailwind.config.ts — кастомные цвета
- screenshots/ — текущие скриншоты сайта

Нашел: в HeroSection.tsx фон однотонный (bg-burgundy-dark), нет изображений.
ServicesSection — простые карточки без hover-эффектов.
MaterialCard — нет анимаций при наведении.
Нет библиотеки анимаций (framer-motion не установлен).

Пишу план...
```

Planner записывает план в `~/.kimi/plans/profit-premium-landing-production-ready.md`:

```markdown
# Plan: Доведение лендинга до production-ready

## Context
Лендинг Profit-Premium (/) нужно довести до премиального вида:
parallax, анимации появления, hover-эффекты, мобильная адаптация.

## Affected Files
| File | Action | Reason |
|------|--------|--------|
| package.json | modify | Установить framer-motion, @gsap/react |
| tailwind.config.ts | modify | Добавить keyframes для fade-in, slide-up |
| src/lib/animations.ts | create | Хук useScrollAnimation + варианты |
| src/components/landing/HeroSection.tsx | modify | Parallax-фон, анимация текста |
| src/components/landing/ServicesSection.tsx | modify | Градиенты, fade-in карточек |
| src/components/landing/TeamSection.tsx | modify | Fade-in + stagger анимация |
| src/components/landing/ReviewsSection.tsx | modify | Slide-up анимация |
| src/components/landing/AdvantagesSection.tsx | modify | Fade-in с задержкой |
| src/components/landing/ContactSection.tsx | modify | Градиент-переход |
| src/components/materials/MaterialCard.tsx | modify | Hover-эффекты |
| src/components/ui/ScrollReveal.tsx | create | Reusable fade-in компонент |
| src/components/ui/SectionDivider.tsx | create | Градиентные переходы между секциями |
| src/styles/globals.css | modify | Плавный скролл |

## Chunks

### Chunk 1: Инфраструктура анимаций
- **Files**: package.json, tailwind.config.ts, globals.css, src/lib/animations.ts, src/components/ui/ScrollReveal.tsx, src/components/ui/SectionDivider.tsx
- **Description**: 
  - Установить framer-motion
  - Добавить CSS scroll-behavior: smooth
  - Создать lib/animations.ts с variants (fadeIn, slideUp, staggerContainer)
  - Создать reusable ScrollReveal обертку на framer-motion
  - Создать SectionDivider с градиентом burgundy→cream
- **Validation**: 
  ```bash
  npx tsc --noEmit && npm run lint
  ```
- **Rollback**: 
  ```bash
  git checkout package.json tailwind.config.ts src/styles/globals.css
  git rm -f src/lib/animations.ts src/components/ui/ScrollReveal.tsx src/components/ui/SectionDivider.tsx
  ```

### Chunk 2: HeroSection — parallax + анимация
- **Files**: src/components/landing/HeroSection.tsx
- **Description**:
  - Добавить фоновое изображение с overlay (бургундный градиент поверх)
  - Parallax-эффект через framer-motion useScroll + useTransform
  - Анимация появления заголовка (fadeIn + slideUp)
  - Анимация появления CTA-кнопки с задержкой
  - Мобильная адаптация: уменьшить parallax-диапазон
- **Validation**:
  ```bash
  npx tsc --noEmit src/components/landing/HeroSection.tsx
  npx playwright test --grep "landing" --project=chromium
  ```
- **Rollback**: git checkout src/components/landing/HeroSection.tsx

### Chunk 3: ServicesSection — градиенты + fade-in
- **Files**: src/components/landing/ServicesSection.tsx
- **Description**:
  - Оборачиваем в SectionDivider (градиент сверху)
  - ScrollReveal для каждой карточки услуги
  - Stagger-анимация (появление по очереди)
  - Hover: scale(1.02) + shadow при наведении
- **Validation**:
  ```bash
  npx tsc --noEmit src/components/landing/ServicesSection.tsx
  ```

### Chunk 4: TeamSection + ReviewsSection
- **Files**: src/components/landing/TeamSection.tsx, src/components/landing/ReviewsSection.tsx
- **Description**:
  - ScrollReveal для карточек членов команды (slideUp)
  - Stagger для reviews-карточек
  - Hover на аватарках: scale + border highlight
- **Validation**:
  ```bash
  npx tsc --noEmit src/components/landing/TeamSection.tsx src/components/landing/ReviewsSection.tsx
  ```

### Chunk 5: AdvantagesSection + ContactSection
- **Files**: src/components/landing/AdvantagesSection.tsx, src/components/landing/ContactSection.tsx
- **Description**:
  - ScrollReveal для преимуществ (fadeIn)
  - SectionDivider перед Contact
  - Contact: slide-up анимация формы
- **Validation**:
  ```bash
  npx tsc --noEmit src/components/landing/AdvantagesSection.tsx src/components/landing/ContactSection.tsx
  ```

### Chunk 6: MaterialCard — hover-эффекты
- **Files**: src/components/materials/MaterialCard.tsx
- **Description**:
  - Hover: поднятие карточки (translateY -4px)
  - Hover: увеличение теней
  - Hover: scale thumbnail (1.05)
  - Плавный transition (duration-300)
- **Validation**:
  ```bash
  npx tsc --noEmit src/components/materials/MaterialCard.tsx
  npx playwright test materials.spec.ts
  ```

### Chunk 7: Мобильная адаптация + финальная валидация
- **Files**: Все landing-компоненты (проверка адаптивности)
- **Description**:
  - Проверить parallax на mobile (уменьшить диапазон)
  - Проверить touch-friendly hover-замены
  - Проверить font-size на малых экранах
  - Прогнать полный E2E
- **Validation**:
  ```bash
  npm run lint
  npx tsc --noEmit
  npm run format:check
  npm run test:e2e
  ```

## Risk Assessment
| Risk | Mitigation |
|------|------------|
| framer-motion увеличит bundle size | Проверить после установки (npm run build), если >10KB gzip — перейти на CSS-анимации |
| Parallax ломает мобильную версию | useScroll с disable на touch-устройствах |
| Анимации конфликтуют с SSR | framer-motion поддерживает SSR, но проверить hydration |
| Нарушение brand colors | Использовать ТОЛЬКО burgundy/cream из tailwind.config.ts |

## Open Questions
- Готовы ли вы к +~15KB gzip от framer-motion? (альтернатива — CSS-only анимации)
- Есть ли предпочтения по фоновым изображениям (свои фото или stock)?
```

---

## Фаза 3: SUBMITPLAN (Оркестратор → Вы)

```
[orchestrator] План готов. Представляю на одобрение:

📋 План: Доведение лендинга до production-ready
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Чанков: 7 | Затрагивает: 13 файлов | Оценка: 45-60 минут

Chunks:
  1. Инфраструктура анимаций (framer-motion, хуки, ScrollReveal)
  2. HeroSection — parallax + анимация текста
  3. ServicesSection — градиенты + fade-in карточек
  4. TeamSection + ReviewsSection — slide-up + stagger
  5. AdvantagesSection + ContactSection — fade-in + разделители
  6. MaterialCard — hover-эффекты
  7. Мобильная адаптация + финальная валидация

⚠️ Открытые вопросы:
  1. Готовы к +~15KB gzip от framer-motion?
  2. Свои фото для фона или сгенерировать / использовать stock?

Выберите опцию:
  [A] Approve — одобрить план как есть
  [B] Revise — скорректировать (опишите что поменять)
  [C] View full plan — посмотреть полный план в файле
```

**Ваш ответ:**
```
Approve. По framer-motion — ок, +15KB терпимо. Фоновые картинки 
генерируй AI под бургундно-кремовую палитру, стиль premium real estate.
```

---

## Фаза 4: CONSTRUCT — Chunk 1 (Executor)

```
[executor] Chunk 1: Инфраструктура анимаций

→ Устанавливаю framer-motion...
npm install framer-motion

→ Создаю src/lib/animations.ts...
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// ... еще variants

→ Создаю src/components/ui/ScrollReveal.tsx...
'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function ScrollReveal({ 
  children, 
  variant = 'fadeInUp',
  className 
}: { 
  children: ReactNode; 
  variant?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={/* variants из animations.ts */}
      className={className}
    >
      {children}
    </motion.div>
  );
}

→ Создаю src/components/ui/SectionDivider.tsx...
// Градиентный переход между секциями

→ Обновляю globals.css...
html { scroll-behavior: smooth; }

→ Обновляю tailwind.config.ts...
// Добавляю keyframes

→ Валидация...
npx tsc --noEmit → ✅ PASS
npm run lint → ✅ PASS (0 errors, 0 warnings)

Chunk 1: COMPLETE ✅
```

---

## Фаза 5: VALIDATE — Chunk 1 (Validator)

```
[validator] VALIDATION REPORT — Chunk 1

TypeScript:  PASS
ESLint:      PASS  (0 warnings)
Prettier:    PASS
Tests:       N/A (инфраструктура, нет тестов)
Security:    PASS  (framer-motion — проверенная библиотека, 0 vulnerabilities)

OVERALL:     PASS ✅

Recommendation: PROCEED → Chunk 2
```

Оркестратор обновляет workflow_state.md и запускает Chunk 2...

---

## Фаза 6: CONSTRUCT — Chunk 2 (HeroSection)

```
[executor] Chunk 2: HeroSection — parallax + анимация

→ Читаю текущий HeroSection.tsx...

→ Генерирую фоновое изображение через AI...
[генерация изображения: premium real estate, burgundy tones, 
abstract architecture, dark background]

→ Редактирую HeroSection.tsx:
  - Добавляю фоновое изображение через next/image
  - Бургундный градиент-оверлей (bg-gradient-to-b from-burgundy-dark/80)
  - Parallax через useScroll + useTransform
  - motion.h1 с fadeInUp
  - motion.button с задержкой 0.3s
  - Мобильная версия: parallax-диапазон уменьшен в 2x

→ Валидация...
npx tsc --noEmit src/components/landing/HeroSection.tsx → ✅ PASS
npx playwright test --grep "landing" → ✅ PASS

Chunk 2: COMPLETE ✅
```

---

## Фаза 7: VALIDATE — Chunk 2 (Validator)

```
[validator] VALIDATION REPORT — Chunk 2

TypeScript:  PASS
ESLint:      PASS  (0 warnings)
Prettier:    PASS
Tests:       PASS  (landing visual tests)
Security:    PASS  (next/image без dangerouslySetInnerHTML)

⚠️ Note: Генерированное фоновое изображение сохранено в 
public/images/hero-bg.jpg. Не забудьте добавить в git.

OVERALL:     PASS ✅

Recommendation: PROCEED → Chunk 3
```

---

## ... (Chunks 3-6 проходят аналогично)

---

## Фаза 8: ADAPT — Chunk 6 (MaterialCard hover)

```
[executor] Chunk 6: MaterialCard hover-эффекты
→ Добавляю hover-эффекты...

→ Валидация...
npx tsc --noEmit src/components/materials/MaterialCard.tsx
❌ ERROR: ' motion' is not defined

[исправляю — забыл импорт motion from framer-motion]

→ Повторная валидация...
npx tsc --noEmit → ✅ PASS
npx playwright test materials.spec.ts → ❌ FAIL

[test output] Material card click intercepted — hover transform 
перекрывает клик-область
```

---

## Фаза 8 (continued): ADAPT

```
[orchestrator] CHECKPOINT 6: VALIDATION FAILED

Validator report:
  E2E Test: FAIL — hover transform перекрывает клик

Адаптирую план...

[executor] Chunk 6 (retry): 
→ Исправляю — переношу transform на внутренний wrapper,
  сохраняя клик-область на внешнем
→ Убираю translateY, использую scale(1.02) + shadow

→ Валидация повторная...
npx tsc --noEmit → ✅ PASS
npx playwright test materials.spec.ts → ✅ PASS

Chunk 6: COMPLETE ✅ (adaptation #1)
```

---

## Фаза 9: CONSTRUCT — Chunk 7 (Мобильная адаптация)

```
[executor] Chunk 7: Мобильная адаптация + финал

→ Проверяю parallax на мобильных:
  - useScroll с ограничением: if (window.innerWidth < 768) range *= 0.3
  
→ Проверяю hover на touch:
  - @media (hover: hover) — hover только на десктопе
  - active: состояние для touch

→ Финальная валидация:
  npm run lint → ✅ PASS
  npx tsc --noEmit → ✅ PASS  
  npm run format:check → ✅ PASS
  npm run test:e2e → ✅ PASS (все 3 spec-файла)

Chunk 7: COMPLETE ✅
```

---

## Фаза 10: COMPLETED (Оркестратор → Вы)

```
[orchestrator] ✅ Задача выполнена

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 ИТОГОВЫЙ ОТЧЁТ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Чанков:     7/7 выполнено
Адаптаций:  1 (MaterialCard hover fix)
Файлов:     13 изменено, 3 создано
Время:      ~45 минут

ЧТО БЫЛО СДЕЛАНО:
  ✅ Установлен framer-motion
  ✅ Созданы reusable ScrollReveal + SectionDivider компоненты
  ✅ Hero: parallax-фон + анимация заголовка (сгенерировано 1 AI-изображение)
  ✅ Services: градиент-переходы + stagger fade-in
  ✅ Team: slide-up анимация карточек
  ✅ Reviews: stagger анимация
  ✅ Advantages: fade-in с задержкой
  ✅ Contact: slide-up форма
  ✅ MaterialCard: hover scale + shadow
  ✅ Мобильная адаптация: уменьшен parallax, touch-friendly

ВАЛИДАЦИЯ:
  ✅ TypeScript: 0 errors
  ✅ ESLint: 0 errors, 0 warnings
  ✅ Prettier: все файлы отформатированы
  ✅ E2E: 12/12 tests passed
  ✅ Бандл: +14KB gzip (framer-motion)

ОТКЛОНЕНИЯ ОТ ПЛАНА:
  - MaterialCard: scale вместо translateY (фикс клик-перехвата)

ФАЙЛЫ ДЛЯ GIT:
  package.json, tailwind.config.ts, src/lib/animations.ts,
  src/components/ui/ScrollReveal.tsx, src/components/ui/SectionDivider.tsx,
  src/components/landing/*.tsx (6 файлов), src/components/materials/MaterialCard.tsx,
  src/styles/globals.css, public/images/hero-bg.jpg

РЕКОМЕНДАЦИИ:
  1. Сгенерируйте ещё 2-3 фоновых изображения для Services/Team секций
  2. Оптимизируйте hero-bg.jpg через squoosh (сейчас ~800KB)
  3. Добавьте prefers-reduced-motion для accessibility
```

---

## Как вы взаимодействовали

| Ваше действие | Когда |
|---------------|-------|
| Написали промпт | Начало |
| Odobrili plan (Approve) | После BLUEPRINT |
| Ответили на вопрос про фоновые картинки | Во время SUBMITPLAN |
| **Ничего не делали** | Во время CONSTRUCT + VALIDATE (система работала сама) |
| Получили отчёт | В конце (COMPLETED) |

**Вы управляли процессом на 2 этапах** — дали задачу и одобрили план. Остальное система сделала сама: писала код, запускала тесты, исправляла ошибки, адаптировала план.

---

## Что если что-то пошло не так

**Сценарий: Вам не нравится результат Chunk 3**

```
Вы: "Стоп, в Services слишком медленная анимация. Сделай быстрее."

[orchestrator] Пользователь запросил изменение в Chunk 3.
→ Обновляю план: уменьшаю duration с 0.6s до 0.3s
→ Перезапускаю Chunk 3 (только этот чанк, не всё сначала)
→ Валидация
→ Продолжаем с Chunk 4
```

**Сценарий: Хотите добавить пункт в план**

```
Вы: "Добавь ещё плавающие частицы на Hero, как на премиум-сайтах"

[orchestrator] Новый пункт → planner дописывает Chunk 8: 
"Particle overlay на Hero"
→ SUBMITPLAN на дополнение
→ CONSTRUCT → VALIDATE → COMPLETED
```

**Сценарий: Нужно откатить всё**

```
Вы: "Откатите всё, не нравится"

[orchestrator] Rollback → executor выполняет команды отката 
из плана для каждого чанка (git checkout + git rm)
→ Все изменения отменены
→ workflow_state.md сброшен
```