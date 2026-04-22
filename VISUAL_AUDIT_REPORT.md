# Визуальный аудит: Личный кабинет vs Лендинг

**Дата аудита:** 2026-04-17  
**Сервер:** `http://localhost:3000` (Next.js 14 dev)  
**Сравниваемые страницы:**

- Лендинг — `src/app/page.tsx` + компоненты `src/components/landing/`
- Личный кабинет — `src/app/(dashboard)/profile/page.tsx` + `src/components/profile/`
- Общий layout кабинета — `src/app/(dashboard)/layout.tsx`
- Сайдбар лендинга — `src/components/landing/Sidebar.tsx`
- Сайдбар кабинета — `src/components/layout/Sidebar.tsx`
- Футер кабинета — `src/components/layout/Footer.tsx`

---

## Категория 1. Сайдбар и навигация

### 1. Логотип разного веса

**Описание:** На лендинге `PROFIT` и `PREMIUM` оба **bold** и одного размера (`text-2xl` + `leading-none tracking-widest`). В личном кабинете `PROFIT` — `font-light`, `PREMIUM` — `font-semibold` + разные `tracking` (`tracking-wide` vs `tracking-widest`).  
**Где:** Личный кабинет (sidebar)  
**Файлы для правки:**

- `src/components/layout/Sidebar.tsx` (строки 41–48) — привести к стилю лендинга
- Опционально: `src/components/landing/Sidebar.tsx` (строки 37–40) — использовать как эталон

### 2. Отсутствие скруглений на лендинге

**Описание:** Кнопка «ЛИЧНЫЙ КАБИНЕТ» на лендинге — прямоугольная без `border-radius`; в ЛК все кнопки `rounded-lg`. Несогласованность стиля CTA.  
**Где:** Лендинг (sidebar)  
**Файлы для правки:**

- `src/components/landing/Sidebar.tsx` (строки 45–50) — добавить `rounded-lg` кнопке «ЛИЧНЫЙ КАБИНЕТ»
- `src/components/landing/Sidebar.tsx` (строки 63–69) — добавить `rounded-lg` кнопке «ОСТАВИТЬ ЗАЯВКУ`

### 3. Навигация без иконок на лендинге

**Описание:** Ссылки в лендинг-сайдбаре — чисто текстовые (`text-xs font-bold tracking-[0.2em]`). В ЛК — с иконками Lucide + активное состояние с `shadow-md` и `bg-burgundy`.  
**Где:** Лендинг (sidebar)  
**Файлы для правки:**

- `src/components/landing/Sidebar.tsx` (строки 51–59) — добавить иконки к ссылкам или создать единый `NavItem` компонент
- Альтернатива: упростить ЛК-сайдбар до текстового стиля лендинга

### 4. Разная ширина сайдбара и обводка

**Описание:** Лендинг `w-56` + `border-l border-cream-dark`. ЛК `w-72` + без правой границы. Визуально ЛК "шире" и "мягче" без чёткой границы.  
**Где:** Оба сайдбара  
**Файлы для правки:**

- `src/components/landing/Sidebar.tsx` (строка 34) — унифицировать ширину
- `src/components/layout/Sidebar.tsx` (строка 37) — унифицировать ширину и добавить/убрать border

### 5. Отсутствие мобильного хедера в ЛК

**Описание:** На лендинге есть `fixed top-0` хедер `h-14` с бургер-меню (`lg:hidden`). В личном кабинете мобильный хедер полностью отсутствует — сайдбар просто перестраивается в колонку сверху.  
**Где:** Личный кабинет  
**Файлы для правки:**

- `src/app/(dashboard)/layout.tsx` — добавить `<Header />` или mobile top-bar
- `src/components/layout/Header.tsx` — использовать как основу (строки 14–31)

---

## Категория 2. Типографика

### 6. H1 без uppercase в ЛК

**Описание:** На лендинге H1 `font-serif text-5xl/6xl/7xl uppercase tracking-wide leading-none`. В ЛК заголовок «Личный кабинет» — `text-4xl lg:text-5xl font-semibold` **без** `uppercase` и `tracking-wide`. Выглядит "мягче" и менее премиально.  
**Где:** Личный кабинет  
**Файлы для правки:**

- `src/app/(dashboard)/profile/page.tsx` (строки 39–41) — добавить `uppercase tracking-wide`
- `src/app/(dashboard)/dashboard/page.tsx` (строки 58, 87) — аналогично для H2
- `src/app/(dashboard)/contacts/page.tsx` (строка 72) — аналогично для H1
- `src/app/(dashboard)/materials/page.tsx` (строка 67) — аналогично для H1

### 7. Разный размер подзаголовков секций

**Описание:** Лендинг использует `text-[10px]` для label'ов секций (`АГЕНТСТВО НЕДВИЖИМОСТИ`, `ПОЧЕМУ ВЫБИРАЮТ НАС`). ЛК использует `text-xs` (≈12px) — визуально крупнее и менее элегантно.  
**Где:** Личный кабинет  
**Файлы для правки:**

- `src/app/(dashboard)/profile/page.tsx` (строки 36, 91, 174) — заменить `text-xs` на `text-[10px]`
- `src/app/(dashboard)/dashboard/page.tsx` (строки 55, 84) — аналогично
- `src/app/(dashboard)/contacts/page.tsx` (строка 69) — аналогично
- `src/app/(dashboard)/materials/page.tsx` (строка 62) — аналогично

### 8. H2 на лендинге всегда uppercase

**Описание:** Лендинг: `С заботой о каждом клиенте`, `Полный цикл работы` — всё `uppercase`. ЛК: `Актуальные предложения`, `Разделы кабинета` — sentence case. Нарушение единого стиля.  
**Где:** Личный кабинет  
**Файлы для правки:**

- `src/app/(dashboard)/dashboard/page.tsx` (строки 58, 87) — добавить `uppercase`
- `src/app/(dashboard)/profile/page.tsx` — все H2/H3

### 9. Заголовки карточек разного tracking

**Описание:** Лендинг `tracking-[0.2em]` для заголовков карточек/услуг. ЛК «ПЕРЕДАТЬ КЛИЕНТА» — `tracking-[0.15em]`. Менее разреженные, тяжелее визуально.  
**Где:** Личный кабинет  
**Файлы для правки:**

- `src/app/(dashboard)/profile/page.tsx` (строки 106, 129, 154) — заменить `tracking-[0.15em]` на `tracking-[0.2em]`

### 10. Разная типографика футер-логотипа

**Описание:** Лендинг футер: `font-serif text-xl tracking-widest`. ЛК футер: `text-lg tracking-[0.3em]` + `tracking-[0.4em]`. Разный размер и tracking между строками.  
**Где:** Личный кабинет (footer)  
**Файлы для правки:**

- `src/components/layout/Footer.tsx` (строки 46–49) — привести к стилю `ContactSection.tsx` (строки 191–193)

### 11. Копирайт в разном регистре

**Описание:** Лендинг: `© 2026 ООО "ПРОФИТ ПРЕМИУМ". ВСЕ ПРАВА ЗАЩИЩЕНЫ.` (верхний регистр). ЛК: `© 2026 ООО "Профит Премиум". Все права защищены.` (sentence case).  
**Где:** Оба футера  
**Файлы для правки:**

- `src/components/layout/Footer.tsx` (строка 118) — привести к верхнему регистру
- `src/components/landing/ContactSection.tsx` (строка 243) — использовать как эталон

### 12. Разный line-height у H2

**Описание:** Лендинг использует `leading-tight` для всех H2. В ЛК `leading-tight` **отсутствует** — заголовки визуально "разъезжаются", особенно на мобильных.  
**Где:** Личный кабинет  
**Файлы для правки:**

- `src/app/(dashboard)/profile/page.tsx` (строка 39) — добавить `leading-tight`
- `src/app/(dashboard)/contacts/page.tsx` (строка 72) — добавить `leading-tight`
- `src/app/(dashboard)/materials/page.tsx` (строка 67) — добавить `leading-tight`

---

## Категория 3. Фоны, карточки и эффекты

### 13. Glassmorphism в ЛК отсутствует на лендинге

**Описание:** Карточки ЛК (`bg-cream/5 backdrop-blur-sm border border-white/10 rounded-2xl`) — полупрозрачные с blur. Лендинг использует сплошные плоские фоны (`bg-cream`, `bg-burgundy`). Разные визуальные языки.  
**Где:** Личный кабинет  
**Файлы для правки:**

- `src/app/(dashboard)/profile/page.tsx` (строки 49, 97, 117, 146, 178) — убрать `backdrop-blur-sm` и `bg-cream/5`, заменить на сплошные цвета
- Или наоборот: добавить glass-эффекты на лендинг (сложнее, т.к. фон сплошной)

### 14. Монотонный фон ЛК

**Описание:** Вся страница ЛК — `bg-burgundy-dark` с едва заметным градиентом. Лендинг чередует секции: `burgundy → cream → burgundy → cream-light → burgundy-dark`. В ЛК нет визуального ритма.  
**Где:** Личный кабинет  
**Файлы для правки:**

- `src/app/(dashboard)/layout.tsx` (строка 20) — рассмотреть альтернативные фоновые вставки
- `src/app/(dashboard)/profile/page.tsx` — добавить светлые/контрастные секции

### 15. Градиентный overlay только в ЛК

**Описание:** `bg-gradient-to-br from-burgundy-dark via-burgundy-dark to-burgundy/20` накладывается на весь main. На лендинге градиентов нет — чистые сплошные фоны.  
**Где:** Личный кабинет  
**Файлы для правки:**

- `src/app/(dashboard)/layout.tsx` (строка 22) — удалить градиентный overlay

### 16. Декоративные иллюстрации с разной opacity

**Описание:** В ЛК `opacity-[0.03]` (почти невидимы, бессмысленны). На лендинге и логине `opacity-20`, `opacity-10` — заметны и создают атмосферу.  
**Где:** Личный кабинет  
**Файлы для правки:**

- `src/app/(dashboard)/profile/page.tsx` (строки 30, 51, 98) — увеличить opacity до `0.05–0.08`
- `src/app/(dashboard)/dashboard/page.tsx` (строка 45) — аналогично
- `src/app/(dashboard)/contacts/page.tsx` (строка 63) — аналогично

### 17. Разный стиль аватаров

**Описание:** ЛК аватар — `h-20 w-20 rounded-2xl bg-cream` (скруглённый квадрат, светлый фон, иконка `User`). TeamSection лендинга — `w-16 h-16 bg-burgundy` (квадрат без скругления, тёмный фон, инициалы).  
**Где:** Личный кабинет  
**Файлы для правки:**

- `src/app/(dashboard)/profile/page.tsx` (строки 57–59) — использовать квадратные аватары в стиле лендинга
- `src/components/layout/Sidebar.tsx` (строка 135) — аватар пользователя в сайдбаре тоже круглый

### 18. Бейдж роли в ЛК не согласован с дизайн-системой

**Описание:** `px-3 py-1 bg-burgundy-light/50 rounded-full text-[10px] text-cream uppercase tracking-wider` — стиль не используется больше нигде. На лендинге аналогичных бейджей нет.  
**Где:** Личный кабинет  
**Файлы для правки:**

- `src/app/(dashboard)/profile/page.tsx` (строки 67–69) — переделать бейдж в стиле кнопок лендинга (прямоугольный, `tracking-[0.2em]`)
- `src/components/profile/ProfileInfo.tsx` (строки 70–75) — `Badge` из shadcn/ui тоже отличается стилем

---

## Категория 4. Кнопки, формы и интерактив

### 19. Кнопки разного скругления и tracking

**Описание:** Лендинг: `text-xs tracking-[0.2em]` без скругления. ЛК: `text-sm tracking-[0.15em] rounded-lg`. Разный визуальный вес и "возраст" дизайна.  
**Где:** Оба  
**Файлы для правки:**

- `src/app/(dashboard)/profile/page.tsx` (строки 122–128) — унифицировать tracking и скругление
- `src/components/landing/Sidebar.tsx` (строки 45–50) — добавить `rounded-lg`
- Общее решение: создать `src/components/ui/ButtonUnified.tsx`

### 20. Outline vs solid кнопки

**Описание:** Лендинг — «ОСТАВИТЬ ЗАЯВКУ» `border` + hover fill. ЛК — «ПЕРЕДАТЬ КЛИЕНТА» `bg-burgundy` + `shadow-lg`. Разная иерархия визуальная.  
**Где:** Оба  
**Файлы для правки:**

- `src/components/landing/Sidebar.tsx` (строки 63–69) — создать единую схему primary/secondary/outline
- `src/components/layout/Sidebar.tsx` (строки 81–88) — кнопка «ПЕРЕДАТЬ КЛИЕНТА» в сайдбаре

### 21. Input'ы разного стиля

**Описание:** Лендинг форма: `border-cream-dark bg-cream-light text-burgundy`. ЛК диалог (`TransferClientDialog`): `border-burgundy/20 bg-white text-burgundy-dark`. Разные цвета рамок и фона.  
**Где:** Оба  
**Файлы для правки:**

- `src/components/landing/ContactSection.tsx` (строки 147, 160) — input'ы лендинга
- `src/components/profile/TransferClientDialog.tsx` (строки 104, 117, 131) — input'ы ЛК
- `src/app/(auth)/login/page.tsx` (строки 282, 318, 387, 400) — input'ы логина
- Общее решение: создать `src/components/ui/InputUnified.tsx`

### 22. Hover-эффект bottom line только в ЛК

**Описание:** Карточки ЛК имеют `absolute bottom-0 left-0 h-[2px] w-0 bg-cream/30 transition-all group-hover:w-full`. На лендинге такого эффекта нет.  
**Где:** Личный кабинет / Лендинг  
**Файлы для правки:**

- `src/app/(dashboard)/profile/page.tsx` (строки 141, 166) — либо убрать (упростить), либо добавить на лендинг
- `src/components/landing/AdvantagesSection.tsx` — можно добавить аналогичный эффект

### 23. Кнопка формы лендинга без скругления

**Описание:** «ПОДОБРАТЬ КВАРТИРУ» в `ContactSection` — прямоугольная. «Открыть форму» в ЛК — `rounded-lg`.  
**Где:** Лендинг  
**Файлы для правки:**

- `src/components/landing/ContactSection.tsx` (строка 169) — добавить `rounded-lg`

### 24. Checkbox на логине не стилизован

**Описание:** «Запомнить меня» использует стандартный HTML-чекбокс с `accent-cream`. Не согласован с кастомными элементами лендинга (где нет чекбоксов вообще).  
**Где:** Страница логина  
**Файлы для правки:**

- `src/app/(auth)/login/page.tsx` (строки 339–347) — стилизовать кастомный чекбокс или заменить на toggle/switch

---

## Категория 5. Layout, футер и мобильная версия

### 25. Разные padding'и секций

**Описание:** Лендинг: `py-24 px-10 lg:px-16` — щедрые, премиальные отступы. ЛК: `p-6 lg:p-10` — визуально "сжато", контент прилипает к краям.  
**Где:** Личный кабинет  
**Файлы для правки:**

- `src/app/(dashboard)/layout.tsx` (строка 30) — увеличить `main` padding до `px-10 lg:px-16`
- `src/app/(dashboard)/profile/page.tsx` — проверить внутренние отступы секций

### 26. Grid с разделителями на лендинге vs gap в ЛК

**Описание:** Лендинг: `gap-px bg-cream-dark` — линии-разделители между карточками. ЛК: `gap-6` — просто расстояние, нет чёткой сетки.  
**Где:** Оба  
**Файлы для правки:**

- `src/app/(dashboard)/profile/page.tsx` (строка 95) — либо добавить разделители, либо убрать с лендинга
- `src/components/landing/AdvantagesSection.tsx` (строка 38) — `gap-px`
- `src/components/landing/ServicesSection.tsx` (строка 39) — `gap-px`

### 27. Футеры совершенно разные по структуре

**Описание:** Лендинг: 3-колоночный grid с лого/описание, разделы, соцсети. ЛК: flex row с контактами (иконки + текст), навигация, соцсети (иконки). Разная информационная архитектура.  
**Где:** Оба  
**Файлы для правки:**

- `src/components/layout/Footer.tsx` — полностью переделать по структуре `ContactSection.tsx` футера
- `src/components/landing/ContactSection.tsx` (строки 188–260) — использовать как эталон структуры

### 28. Соцсети: квадраты vs круги

**Описание:** Лендинг футер: `w-10 h-10 border` (квадрат, текстовые метки TG/WA/ВК). ЛК футер: `rounded-full bg-cream/10` (круг, SVG-иконки).  
**Где:** Оба  
**Файлы для правки:**

- `src/components/layout/Footer.tsx` (строки 100–114) — привести к квадратам или кругам
- `src/components/landing/ContactSection.tsx` (строки 224–236) — аналогично

### 29. Отсутствие блока статистики в ЛК

**Описание:** Hero лендинга имеет `border-t` блок с цифрами (`500+`, `8 ЛЕТ`, `0 ₽`). В ЛК нет аналогичного элемента доверия/статуса. Пустое пространство под заголовком.  
**Где:** Личный кабинет  
**Файлы для правки:**

- `src/app/(dashboard)/profile/page.tsx` — добавить блок статистики после заголовка (кол-во переданных клиентов, статус и т.д.)
- `src/app/(dashboard)/dashboard/page.tsx` — уже есть `WelcomeSection`, можно расширить

### 30. Мобильное меню на лендинге vs отсутствие в ЛК

**Описание:** На лендинге мобильное меню — анимированный dropdown (`bg-cream border-b border-cream-dark`). В ЛК мобильный сайдбар просто перестраивается в колонку, нет анимации и оверлея.  
**Где:** Личный кабинет  
**Файлы для правки:**

- `src/app/(dashboard)/layout.tsx` — добавить состояние `menuOpen` и анимированный dropdown
- `src/components/landing/Sidebar.tsx` (строки 72–126) — использовать как референс анимации

---

## Сводка и приоритеты

### Критичные (влияют на первое впечатление)

- **#6** (H1 без uppercase), **#7** (размер label'ов), **#25** (padding'и) — делают ЛК визуально "дешевле" лендинга
- **#1** (логотип), **#4** (ширина сайдбара) — брендинг разъезжается
- **#13** (glassmorphism) — конфликт стилей плоский vs объёмный

### Средние (влияют на консистентность)

- **#9** (tracking), **#12** (line-height), **#19** (кнопки), **#21** (input'ы)
- **#11** (регистр копирайта), **#27–28** (футер и соцсети)

### Низкие (детали)

- **#16** (opacity иллюстраций), **#22** (bottom line hover), **#24** (checkbox)

### Рекомендуемый подход к исправлению

1. Создать единые компоненты в `src/components/ui/` или `src/components/shared/`:
   - `PageHeader.tsx` — H1 + label секции
   - `ActionCard.tsx` — карточка с иконкой, заголовком, описанием
   - `ButtonPrimary.tsx`, `ButtonOutline.tsx` — унифицированные кнопки
   - `Footer.tsx` — единый футер для лендинга и кабинета
2. Вынести типографические константы в Tailwind или CSS-переменные:
   - `text-[10px]` для label'ов
   - `uppercase tracking-[0.2em]` для заголовков
   - `leading-tight` для H1/H2
3. Выбрать единый стиль скруглений: либо `rounded-lg` везде, либо убрать скругления (как на лендинге)
4. Унифицировать сайдбар: один компонент с вариациями для guest/authenticated
