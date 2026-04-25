# Profit-Premium Agent System

Система агентов для проекта Profit-Premium, построенная на паттерне **PEVC Loop** (Plan-Execute-Validate-Checkpoint) — подход, используемый в Claude Code Plan Mode, Devin и Cursor Autonomous Workflow в 2026 году.

## Что это такое

Это не skills (`.agents/skills/` — они отдельно). Это **YAML-конфигурации агентов** с system prompt'ами, реализующие workflow:

```
ANALYZE → BLUEPRINT → CONSTRUCT → VALIDATE → (ADAPT →)* → COMPLETED
```

Каждая задача проходит через планирование, исполнение по чанкам, валидацию после каждого чанка и адаптацию плана при необходимости.

## Архитектура

### Главный оркестратор (`main.yaml`)

Управляет workflow, но **не пишет код**. Делегирует субагентам:

```
Пользователь → [main] → анализирует → делегирует → контролирует → результат
                     ↓
              ┌──────┼──────┐
              ↓      ↓      ↓
          planner executor validator
```

### Субагенты

| Агент | Роль | Тип | Инструменты |
|-------|------|-----|-------------|
| **planner** | Исследует код, пишет план | `explore` (read-only) | ReadFile, Glob, Grep, AskUserQuestion |
| **executor** | Пишет код по плану | `coder` | ReadFile, WriteFile, StrReplaceFile, Shell |
| **validator** | Запускает тесты и линтеры | `coder` (тесты) | ReadFile, Shell (lint/test) |

### Workflow State (`workflow_state.md`)

Файл состояния в формате Cursor Autonomous Loop. Оркестратор читает его в начале каждой итерации и обновляет после каждого действия. Содержит:
- Текущую фазу и статус
- Активный план
- Чекпоинты (результаты валидации каждого чанка)
- Лог выполнения (авто-ротация при переполнении)

## Как использовать

### Запуск через Kimi CLI

```bash
# Перейти в проект
cd /path/to/profit-premium

# Запустить с кастомной системой агентов
kimi --agent-file .agents/main.yaml
```

### Опции запуска

```bash
# С планировщиком по умолчанию (--plan)
kimi --agent-file .agents/main.yaml --plan

# С включённым thinking mode (для сложных задач)
kimi --agent-file .agents/main.yaml --thinking

# С дополнительной директорией (memory-obsidian)
kimi --agent-file .agents/main.yaml --add-dir ./memory-obsidian

# С навыками (skills работают параллельно с агентами!)
kimi --agent-file .agents/main.yaml --skills-dir .agents/skills
```

### Внутри сессии

```
# Переключиться в Plan Mode (ручное)
Shift+Tab

# Увидеть текущий план
Ctrl+E

# Отправить план на одобрение (в Plan Mode)
ExitPlanMode → SubmitPlan

# Управление todo-листом
/todo

# Проверить background задачи
/tasks
```

## Пример workflow

### Задача: "Добавить фильтр по цене на страницу материалов"

```
Пользователь: Добавь фильтр по цене на /materials

[main] ANALYZE
  └─ Читаю AGENTS.md, существующий код /materials
  └─ Задача затрагивает 3+ файла → запускаю planner

[planner] BLUEPRINT
  └─ Читает FilterBar.tsx, FilterDrawer.tsx, materials/page.tsx
  └─ Читает schema.prisma (есть ли поле price?)
  └─ Пишет план в ~/.kimi/plans/...md
  └─ Возвращает план

[main]
  └─ SubmitPlan → пользователь одобряет

[executor] Chunk 1: Добавить price в Prisma schema + миграция
  └─ npx prisma migrate dev --name add_price_to_materials
  └─ Обновляет seed.ts с тестовыми данными
  └─ Validation: npx tsc --noEmit → PASS

[validator] CHECKPOINT 1
  └─ TypeScript: PASS
  └─ ESLint: PASS
  └─ Prettier: PASS
  └─ OVERALL: PASS → следующий чанк

[executor] Chunk 2: Добавить price filter в FilterBar (desktop)
  └─ Обновляет FilterBar.tsx
  └─ Validation: npx tsc --noEmit → PASS

[validator] CHECKPOINT 2
  └─ TypeScript: PASS
  └─ ESLint: PASS
  └─ materials.spec.ts: PASS
  └─ OVERALL: PASS → следующий чанк

[executor] Chunk 3: Добавить price filter в FilterDrawer (mobile)
  └─ Обновляет FilterDrawer.tsx
  └─ Validation: npx tsc --noEmit → PASS

[validator] CHECKPOINT 3
  └─ TypeScript: PASS
  └─ ESLint: PASS
  └─ OVERALL: PASS

[validator] FINAL VALIDATION
  └─ npm run test:e2e → PASS (все тесты)
  └─ OVERALL: PASS

[main] COMPLETED
  └─ Сводка: 3 чанка, 5 файлов изменено, все проверки пройдены
```

## Почему такая архитектура

### 1. Plan-First (Claude Code, Gemini CLI)

Все современные AI-инструменты (2026) поддерживают Plan Mode — read-only планирование перед кодом. Это предотвращает "ready, fire, aim" проблему, когда AI начинает писать код до того, как понял кодовую базу.

### 2. Checkpoint-Based Execution (Devin)

Devin использует чекпоинты после каждого значимого шага: Plan → Chunk → Test → Fix → Checkpoint → Next. Это позволяет ловить ошибки рано, а не когда весь код уже написан.

### 3. Autonomous Loop с workflow_state (Cursor)

Cursor community разработал паттерн `workflow_state.md` — единый файл, который AI читает и пишет каждую итерацию. Это даёт:
- Персистентность состояния между контекст-свопами
- Прозрачность — пользователь видит фазу и прогресс
- Возможность возобновления после прерывания

### 4. Specialization (Kimi Subagents)

Kimi поддерживает субагентов с разными наборами инструментов. Planner работает read-only (не может сломать код случайно), executor пишет код, validator тестирует. Это separation of concerns как в реальной команде.

## VS Code Extension vs CLI

### Kimi Code CLI (рекомендуется для этой системы)

| Функция | Поддержка |
|---------|-----------|
| Custom YAML agents (`--agent-file`) | ✅ Полная |
| Subagents (`Agent` tool) | ✅ Полная |
| Plan Mode (EnterPlanMode/ExitPlanMode) | ✅ Полная |
| SubmitPlan (одобрение плана) | ✅ Полная |
| Background tasks | ✅ Полная |
| Todo list (SetTodoList) | ✅ Полная |
| Hooks | ✅ Полная |

### Kimi Code for VS Code

| Функция | Поддержка |
|---------|-----------|
| Custom YAML agents | ❌ Нет (только built-in: default, okabe) |
| Subagents | ⚠️ Ограниченно |
| Plan Mode | ⚠️ Базовый (нет SubmitPlan) |
| MCP Servers | ✅ Полная |
| Skills (SKILL.md) | ✅ Полная |
| AGENTS.md | ✅ Читается автоматически |

### Вывод

**Эту систему агентов можно использовать ТОЛЬКО через Kimi Code CLI.** VS Code Extension не поддерживает кастомные YAML-агенты (`--agent-file`) и полноценные субагенты.

**Но!** VS Code Extension хорош для:
- Быстрых вопросов по коду (без агентов)
- Inline редактирования
- MCP Servers (Playwright для скриншотов)

**Гибридный подход**:
- Комплексные задачи → CLI с агентами
- Быстрые правки → VS Code Extension
- Тестирование UI → VS Code + Playwright MCP

## Структура файлов

```
.agents/
├── main.yaml              # Главный оркестратор
├── planner.yaml           # Subagent: анализ + планирование
├── executor.yaml          # Subagent: исполнение кода
├── validator.yaml         # Subagent: валидация + тесты
├── prompts/
│   ├── main.md            # System prompt: оркестратор
│   ├── planner.md         # System prompt: планировщик
│   ├── executor.md        # System prompt: исполнитель
│   └── validator.md       # System prompt: валидатор
├── workflow_state.md      # Файл состояния workflow
├── skills/                # ← ваши существующие skills (не трогаем)
│   ├── profit-premium-ui/
│   ├── web-dev/
│   └── ...
└── README.md              # Этот файл
```

## Отличие от Skills

| | Skills | Эта система агентов |
|--|--------|---------------------|
| **Формат** | SKILL.md файлы | YAML + .md prompt файлы |
| **Назначение** | Знания и шаблоны (UI, код-стиль) | Workflow и оркестрация |
| **Запуск** | `--skills-dir` или авто-подхват | `--agent-file` |
| **Могут писать код?** | Нет (только шаблоны) | Да (через субагентов) |
| **Plan-Execute-Validate?** | Нет | Да |
| **Subagents?** | Нет | Да |

**Skills и агенты работают вместе** — skills дают знания (как писать UI), агенты управляют процессом (что и когда писать).

## Документация Kimi

- [Agents and Subagents](https://www.kimi.com/code/docs/en/kimi-code-cli/customization/sub-agents.html)
- [Config Files](https://www.kimi.com/code/docs/en/kimi-code-cli/configuration/configuration-files.html)
- [Kimi Command Reference](https://moonshotai.github.io/kimi-cli/en/reference/kimi-command.html)
- [Interaction and Input](https://moonshotai.github.io/kimi-cli/en/guides/interaction.html)