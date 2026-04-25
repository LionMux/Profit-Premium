# Research-First Development

Правило: перед реализацией любой нетривиальной фичи — всегда сначала исследуй, как это уже сделано лучшие в индустрии.

## Триггер

Используй этот skill, когда задача требует:
- Создания нового UI-компонента с эффектами (анимации, 3D, canvas, SVG)
- Написания хука/утилиты, решающей общую проблему (drag, tilt, intersection, scroll)
- Реализации алгоритма или паттерна (debounce, throttle, virtual scroll, etc.)
- Интеграции с внешним API или сервисом
- Любого случая, когда ты думаешь "как бы это сделать"

## Workflow

```
ЗАДАЧА → sequentialthinking → ЭТО УЖЕ РЕШЕНО? → ПОИСК РЕФЕРЕНСОВ → АНАЛИЗ → memory → РЕАЛИЗАЦИЯ
```

### Шаг 0: Декомпозиция через sequentialthinking

**Перед любым поиском** запусти `sequentialthinking` MCP:
- `totalThoughts: 5-10`
- Разбей задачу: что нужно сделать → какие подводные камни → какие альтернативы
- Проверь гипотезы: "А что если сделать X?" → "Какие минусы у X?"
- Только после завершения цепочки мыслей — переходи к поиску

### Шаг 1: Проверка — изобретаю ли я велосипед?

Задай себе вопросы:
- [ ] Это распространённая UI-задача? (slider, modal, toast, tooltip, карточки, таблицы...)
- [ ] Это стандартная анимация? (fade, slide, parallax, 3D tilt, morphing...)
- [ ] Это общий хук/утилита? (useScroll, useIntersection, useDebounce...)
- [ ] Я НЕ уверен на 100% в лучшем подходе?

**Если хотя бы один ответ "да" → идём к шагу 2.**

### Шаг 2: Поиск референсов (3-7 минут)

Искать в таком порядке:

1. **GitHub Code Search** — `search_code` MCP:
   - `q: "3d tilt card" react typescript`
   - `q: "useInView" hook intersection observer`
   - `q: "mesh gradient" canvas 2d`
   - Фильтры: language, stars (смотри популярные репозитории)

2. **Context7 Docs** — `query-docs` MCP:
   - Официальная документация фреймворка/библиотеки
   - Code examples из актуальных версий

3. **Web Search** — `web_search_exa` / `SearchWeb`:
   - "best practices react 3d card tilt 2025"
   - "vanilla js canvas mesh gradient implementation"
   - Ищи статьи с code examples, не только теорию

### Шаг 3: Анализ (2-3 минуты)

Из найденных референсов извлеки:

| Что искать | Почему |
|------------|--------|
| **Magic numbers** | `MAX_TILT = 10`, `perspective = 1000`, `duration = 300` — цифры, отточенные сотнями проектов |
| **Edge cases** | Как обрабатывают resize, reduced-motion, touch devices, SSR |
| **Performance tricks** | `willChange`, `requestAnimationFrame`, `transform` vs `left/top`, throttle/debounce |
| **Accessibility** | `prefers-reduced-motion`, keyboard support, screen readers |
| **API design** | Props interface, callbacks, конфигурация через options vs отдельные props |

### Шаг 4: Выбор подхода

Составь таблицу сравнения:

| Референс | Авторитет | Ключевые фичи | Подходит ли под наш проект? |
|----------|-----------|---------------|----------------------------|
| Wix/interact | High (prod lib) | angle 15°, perspective 800, hover check | ✅ Близко к нашей палитре |
| use-tilt.ts | Medium | scale 1.02, glare, cubic-bezier | ✅ Хорошая основа |
| Самописный | Low | ??? | ❌ Не используем без обоснования |

**Правило:** если есть 2+ качественных референса с одинаковыми magic numbers — берём их. Если расходятся — выбирай middle ground или обоснуй отклонение.

### Шаг 5: Реализация

Теперь, когда у тебя есть:
- Конкретные цифры (angles, durations, opacities)
- Проверенная структура кода
- Известные edge cases

Можно писать код. Но:
- Не копируй слепо — адаптируй под проект (палитру, типографику, архитектуру)
- Не добавляй лишнего — если референс делает 10 фич, а тебе нужно 3, возьми 3
- Оставляй ссылку на референс в комментарии

## Антипаттерны

❌ **"Я сам придумаю"** — для распространённых задач это почти всегда хуже готового решения  
❌ **"Найду один референс и скопирую"** — нужно 2-3 для валидации подхода  
❌ **"Поищу после того как напишу"** — рефакторинг дороже, чем research сразу  
❌ **"Это слишком просто для поиска"** — даже `debounce` имеет 10+ вариантов реализации  

## Примеры применения

| Задача | Что искать | Что нашли бы до реализации |
|--------|-----------|---------------------------|
| 3D Tilt Card | `tilt card perspective react github` | Wix: 15°/800px, use-tilt: scale 1.02 + glare |
| Mesh Gradient | `canvas 2d mesh gradient organic` | 3-4 radial gradients, sinusoidal movement, 15s cycle |
| Slot Counter | `slot machine number counter react` | translateY strips, overflow:hidden, cubic-bezier |
| Scroll Line | `svg stroke dashoffset scroll animation` | IntersectionObserver + stroke-dasharray |

## MCP Tools для Research

| Tool | Когда использовать |
|------|-------------------|
| `search_code` (GitHub) | UI-компоненты, хуки, утилиты — реальные проекты |
| `query-docs` (Context7) | Официальные patterns для React/Next.js/Prisma/etc. |
| `web_search_exa` | Статьи, best practices, сравнения библиотек |
| `crawling_exa` | Углубиться в конкретную статью/документацию |

---

**Запомни:** 10 минут research экономят 30 минут дебага и переделок.
