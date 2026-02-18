# Это проект .smpl - таск-менеджер, интегрированный с Телеграммом.

**ВАЖНО:** дополняй этот файл, если встретишь что-то неочевидное 

### Структура проекта:

`public` - публичные ассеты:

`icons` - иконки приложения
`images` - обшие картинки
`scripts` - общие скрипты

`src` - весь фронтенд проекта:

`app` - главная страница и лайаут, директории со страницами. Внутри директории страницы (например, `workspace`), может быть директория `ui` или любая другая относящаяся непосредственно к этой странице. Также здесь находится директория `api` с API роутами Next.js
`entities` - функционал для взаиможействия отдельной сущности с бэком (моки, интерфейсы, функции апи)
`features` - кастомные хуки, общие для всего проекта
`shared` - все общие утилиты, компоненты, локализация и прочее
`widgets` - виджеты, состоящие из нескольких атомарных компонентов. У виджета может быть свой `ui`, хуки и тд

`prisma` - схема базы данных и миграции

### Технический стек:

Приложение написона на Next.js с использованием App Router. Все стили пишутся на Sass, после каждого взаимодействия со стилями необходимо использовать `npm run stylelint`. Взаимодействие с бэком реализуется при помощи SWR + axios. В качестве хранилища данных выступает Zustand. База данных - PostgreSQL через Prisma ORM.

### Основная информация:

В основе менеджера лежат воркспейсы. Глобально они делятся на личный "My workspace" и все остальные - командные. Личный воркспейс создаётся автоматически при создании пользователя. Личный воркспейс отличается от командных тем, что прямо в нём можно создавать задачи. У каждого воркспейса имеются проекты - сборники задач. Каждый проект привязан к конкретному воркспейсу. Внутри проекта лежит самая маленькая единица - задача, у которой есть тип (статус). Тип можно менять.

### База данных (Prisma):

Модели:
- `User` - пользователь (id, telegram_id, first_name, last_name, username). `telegram_id` - уникальный идентификатор из Telegram (BigInt). Фото пользователя не хранится в БД — берётся из Telegram webApp (`tgUser.photo_url`)
- `Workspace` - воркспейс (id, title, description, is_my_workspace, owner_id)
- `UserWorkspace` - связь пользователя и воркспейса (для teammates)
- `Project` - проект (id, workspace_id, title, description, is_starred, alias). `alias` - короткий идентификатор проекта для serial задач (например, `PROJ`)
- `Task` - задача (id, workspace_id, project_id, title, is_starred, priority, date, created_at, type, serial). `date` - дедлайн задачи (обязательное), `created_at` - дата создания (автоматическое), `serial` - уникальный идентификатор для отображения (например, `username-1` или `PROJ-42`)

Типы задач (`TaskType`): `todo`, `progress`, `review`, `done`

### API роуты:

- `/api/user` - GET (список), POST (создание, требует telegram_id)
- `/api/user/[id]` - GET (получение по внутреннему id)
- `/api/user/telegram/[telegramId]` - GET (получение по Telegram ID)
- `/api/workspace` - GET (список, с `?userId` для фильтрации), POST (создание)
- `/api/workspace/my` - GET (личный воркспейс пользователя, с `?userId`)
- `/api/workspace/[id]` - GET, PUT, DELETE
- `/api/project` - GET (список, с `?workspace` для фильтрации), POST (создание, требует alias)
- `/api/project/[id]` - GET, PUT, DELETE
- `/api/task` - GET (список, с `?workspace`, `?project`, `?userId`), POST (создание, требует workspace_id, title, date; для my workspace требует telegram_id, для проекта - project_id)
- `/api/task/[id]` - GET, PUT (частичное обновление: title, type), DELETE
- `/api/teammate` - POST (добавление), DELETE (удаление)
- `/api/teammate/[workspaceId]` - GET (список тиммейтов воркспейса)

### SWR и обновление данных:

- `useSWRData` возвращает `{ data, error, isLoading, mutate }` - `mutate` используется для инвалидации кэша
- Для глобальной инвалидации используется `useSWRConfig()` из `swr`
- Ключи кэша SWR совпадают с URL запросов:
  - Личные задачи: `/api/task?project=my&userId=${tgUser?.id}`
  - Задачи воркспейса: `/api/task?workspace=${workspaceId}`
  - Проекты воркспейса: `/api/project?workspace=${workspaceId}`
- После создания/изменения сущности нужно вызвать `mutate(ключ)` для обновления списка

### Создание и изменение задач:

- Виджет `add-task` (`src/widgets/add-task/`) отвечает за создание задач
- `workspace` id берётся из Zustand через `useSetup()` хук
- Для личного воркспейса задачи создаются с типом `review` (они сразу попадают в "My tasks")
- Для проектов задачи создаются с типом `todo`
- Сортировка задач выполняется на клиенте в `TasksList`: сначала по `date` (asc), затем по `id` (desc - новые первее)
- Изменение типа задачи: `changeTask()` в `src/widgets/task-item/utils/changeTaskType.ts`
- Последовательность типов: `todo` -> `progress` -> `review` -> `done` (см. `getNextTaskType`)

### Хранение задач:

- Задачи хранятся в Zustand store (`useTasksStore`) в формате `TasksDataInterface`
- Формат: `{ workspace_id, todo: [], progress: [], review: [], done: [] }`
- Данные загружаются через SWR и синхронизируются с Zustand через `useEffect` в `page.tsx`
- Компоненты берут задачи из Zustand через `useSetup()` хук

### Стиль кода:

- Два отступа между импортами и кодом
- Между импортами отступы не нужны
- Моки хранятся в `entities/*/mocks/`, но в продакшене используются реальные API
- В импортах сначала идут пропсы, потом стили, в самом конце `classnames`
- Пробелы внутри фигурных скобок: `{ value }` вместо `{value}`
- Поля интерфейсов отделяем запятыми
- В конце `'use client'` должна быть точка с запятой: `'use client';`
- Фигурные скобки обязательны для всех управляющих конструкций: `if () { return; }` вместо `if () return;`
- **Комментарии в коде не нужны** — код должен быть самодокументируемым. Исключение: действительно неочевидная логика, которую невозможно понять из контекста
- Приоритет отдаётся одиночным кавычкам `'`

---

## Неочевидные вещи (для будущих агентов):

### SWR + Zustand синхронизация

Данные загружаются через SWR, но хранятся в Zustand. После `mutate()` SWR перезагружает данные, но нужен `useEffect` с зависимостью от `data` чтобы обновить Zustand store:

```tsx
const { data: tasksListData } = useSWRData<TasksDataInterface>(...);
const { setTasks } = useSetup();

useEffect(() => {
    if (tasksListData) {
        setTasks(tasksListData);
    }
}, [tasksListData, setTasks]);
```

### Замыкания в useCallback

При использовании `useCallback` с зависимостями от state, функция замыкает значение state на момент создания. Если state часто меняется (например `isThresholdReached` при драге), функция может иметь устаревшее значение.

**Проблема:** `handleEnd` зависит от `isThresholdReached`, но к моменту вызова значение может измениться.

**Решение:** Убедиться что все зависимости в массиве `useCallback` актуальны, либо использовать `useRef` для хранения актуального значения.

### Порядок вызовов при драге

В `onTouchEnd`/`onMouseUp` важен порядок:
1. Сначала вызвать `handleEnd()` и сохранить результат
2. Потом сбросить `setIsThresholdReached(false)`
3. Потом использовать сохранённый результат

Если сбросить threshold до вызова `handleEnd()`, результат будет неверным.

### Интерфейсы vs БД

На клиенте и в БД поля могут называться по-разному. В этом проекте везде используется `type`, но если вдруг нужен маппинг - делать его в API функциях (`src/entities/*/api/`), а не в компонентах.

### PUT для частичного обновления

API ручка `/api/task/[id]` принимает частичные данные. Можно отправить только `{ type: 'done' }` без остальных полей - обновится только type. Prisma игнорирует `undefined` значения при update.

### Типы задач в Prisma

Enum `TaskType` в Prisma генерирует TypeScript тип в `@/generated/prisma`. При изменении enum нужно:
1. Изменить `schema.prisma`
2. Выполнить SQL миграцию (ALTER TYPE, ALTER TABLE)
3. Запустить `npx prisma generate`

### Тесты

**Unit-тесты** — для каждой функции (кроме совсем тривиальных) должны быть написаны unit-тесты. Они пишутся на vitest. Файлы тестов рядом с кодом, название *.spec.ts. Названия тестов всегда на английском, комментарии не нужны кроме неочевидных случаев. Для каждой функции свой describe, внутри несколько it с различными тесткейсами. Они должны тестировать разные вещи: не пиши несколько повторяющихся тестов.

**E2E-тесты** — написаны на Playwright, лежат в `e2e/`. Покрывают:
- `pages.spec.ts` — загрузка страниц, отсутствие console errors
- `api.spec.ts` — формат ответов API (tasks_info, tasks_count, progress и тд)
- `performance.spec.ts` — таймауты API (< 3s), время загрузки страниц (< 5s), CLS (< 0.25)

Запуск:
- `pnpm test:e2e` — против локального сервера (нужен запущенный `pnpm dev`)
- `BASE_URL=https://preview.vercel.app pnpm test:e2e` — против Vercel preview deployment
- `pnpm test:e2e:ui` — с визуальным интерфейсом Playwright

`MOCK_TELEGRAM_ID` в тестах должен совпадать с `USER_ID_MOCK` из `src/shared/constants/index.ts`.

### Работа с git

Ветки нужно называть в соответствии с паттерном: `smpl-[name]-[num - опционально]`, где `name` - это короткое осмысленное название ветки, отражающее суть изменений.
Все коммиты должны называться в соответствии с [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

### Мок пользователя при разработке

При разработке вне Telegram (в браузере) используется мок пользователя из `src/shared/constants/index.ts`:

```ts
export const USER_ID_MOCK = '8623816671';
export const USER_PHOTO_MOCK = '...';
export const USERNAME_MOCK = '.smpl user';
```

Хук `useUser()` возвращает `tgUser` из Telegram, а если он недоступен - возвращает мок. Чтобы тестировать под конкретным пользователем, нужно изменить `USER_ID_MOCK` на нужный `telegram_id` из БД.

### Serial задачи и alias проекта

У каждой задачи есть `serial` - уникальный идентификатор для отображения (например, `separatrix-1` или `PROJ-42`).

**Логика генерации serial:**
- Для my workspace: `username || telegram_id + '-' + номер задачи у этого юзера в my workspace`
- Для проекта: `project.alias + '-' + номер задачи в этом проекте`

**Важно:** При создании задачи в my workspace нужно передавать `telegram_id` в теле запроса. Без него API вернёт 400.

```ts
// Пример создания задачи в my workspace
const data = {
    workspace_id: workspaceId,
    telegram_id: tgUser?.id,  // Обязательно для my workspace!
    title: 'Task name',
    date: new Date().toISOString(),
    type: 'review',
};
```

У проекта есть `alias` (например, `PROJ`, `SMPL`) - он задаётся вручную при создании проекта и используется для генерации serial задач в этом проекте.

### BigInt для telegram_id

В БД `telegram_id` хранится как `BigInt`. При поиске пользователя нужно конвертировать:

```ts
const user = await db.user.findByTelegramId(BigInt(telegramId));
```

На клиенте `tgUser?.id` приходит как number/string, в API он конвертируется в BigInt для запроса к БД.

### Загрузка Telegram скрипта и isUserLoading

`TelegramProvider` загружает скрипт асинхронно. До загрузки `webApp` равен `undefined`, после — объект.

`useUser()` возвращает:
- `tgUser` — пользователь (реальный из Telegram или мок)
- `isUserLoading` — `true` пока скрипт не загружен

```ts
const { webApp, tgUser } = useTelegram();
const isUserLoading = webApp === undefined;
```

**Важно:** Не начинать SWR запросы пока `isUserLoading === true`, иначе будет двойная загрузка (сначала с mock ID, потом с реальным ID).

### SWR ключи и мерцание скелетонов

Если SWR ключ меняется (например, `workspace` меняется с `0` на реальный ID), SWR считает это новым запросом и показывает `isLoading: true` снова → скелетон мерцает.

**Решение:** Передавать `null` как URL пока данные не готовы:

```ts
const url = workspace ? `/api/project?workspace=${workspace}` : null;
const { data, isLoading } = useSWRData(fetcher, errorMsg, url, workspace);

// Показывать loading пока workspace не готов
const showLoading = !workspace || isLoading;
```

### Оптимистичные обновления задач

При изменении типа задачи используется оптимистичный подход:
1. Сразу обновить UI (галочка, перемещение в store)
2. Запрос в фоне (без await)

```ts
setChecked(true);

setTimeout(() => {
    moveTask(taskId, type, nextType);
}, 200); // Задержка для анимации

changeTask({ id: taskId, data: { type: nextType } });
```

`moveTask` в `useTasksStore` перемещает задачу между списками в Zustand без ожидания API.

### Мониторинг и логирование

**Vercel Analytics** (`@vercel/analytics`) — отслеживание посещений и пользовательских событий. Подключён в `src/app/layout.tsx` через `<Analytics />`.

**Vercel Speed Insights** (`@vercel/speed-insights`) — замеры производительности (Web Vitals: LCP, INP, CLS, TTFB, FCP). Подключён в `src/app/layout.tsx` через `<SpeedInsights />`. Данные отображаются в Vercel Dashboard → Speed Insights.

**Структурированный логгер** (`src/shared/utils/logger/logger.ts`) — все логи выводятся в формате JSON с полями `timestamp`, `level`, `message`, `context`. Vercel парсит JSON-логи и позволяет фильтровать по ним в Log Drains / Runtime Logs.

- `loggerLog`, `loggerWarn`, `loggerInfo`, `loggerError` — простое логирование
- `loggerLogCtx`, `loggerWarnCtx`, `loggerInfoCtx`, `loggerErrorCtx` — логирование с контекстом (первый аргумент — объект контекста)

**withLogging** (`src/shared/utils/logger/withLogging.ts`) — обёртка для API-роутов. Автоматически логирует: метод, путь, query-параметры, статус ответа, время выполнения (ms). Применяется ко всем API-хэндлерам:

```ts
export const GET = withLogging(async (req: NextRequest) => {
    // ...
});
```

Для хэндлеров с параметрами:

```ts
export const GET = withLogging(async (req: NextRequest, { params }: RouteParams) => {
    // ...
});
```

**withDbTiming** (`src/shared/utils/logger/withDbTiming.ts`) — обёртка для замера времени отдельных БД-запросов. Запросы дольше 500ms логируются с уровнем `warn` и пометкой "Slow DB query":

```ts
const user = await withDbTiming('user.findByTelegramId', () =>
    db.user.findByTelegramId(BigInt(telegramId))
);
```

**WebVitalsReporter** (`src/shared/components/web-vitals-reporter/`) — клиентский компонент, собирающий детальные Web Vitals с attribution через `web-vitals` библиотеку и отправляющий их на `/api/vitals`. Для каждой метрики собирается разбивка:
- LCP: target элемент, url ресурса, TTFB, resourceLoadDelay, resourceLoadDuration, elementRenderDelay
- INP: target элемент, тип взаимодействия, inputDelay, processingDuration, presentationDelay
- CLS: target сдвинутого элемента, значение сдвига
- FCP: TTFB, firstByteToFCP
- TTFB: dns, connection, request, waiting durations

**API `/api/vitals`** — принимает метрики от WebVitalsReporter и логирует их в структурированном виде. Метрики выше порогов (LCP > 2500ms, FCP > 1800ms, INP > 200ms, CLS > 0.1, TTFB > 800ms) логируются с уровнем `warn`.

**Instrumentation** (`src/instrumentation.ts`) — серверный мониторинг. Функция `register()` выполняется при старте сервера, `onRequestError()` ловит необработанные ошибки рендеринга и роутинга.

**Важно:** `@vercel/analytics`, `@vercel/speed-insights` и `web-vitals` должны быть в `dependencies` (не `devDependencies`), иначе они не попадут в production build.

### Оптимизация производительности БД

**DB connection warmup** — в `instrumentation.ts` при старте сервера выполняется `SELECT 1`, чтобы прогреть TCP-соединение с БД. Без этого первый запрос пользователя тратит ~1000ms на установление соединения.

**Индексы на FK** — в `schema.prisma` добавлены `@@index` на все foreign key поля (`owner_id`, `workspace_id`, `project_id`, `type`). PostgreSQL не создаёт индексы на FK автоматически. После изменения индексов нужно запустить `pnpm migrate`.

**Лёгкие запросы к воркспейсам** — методы `findUnique`, `findMany`, `findByUser`, `findMyWorkspace` в `prismaClient.ts` загружают только `{ type: true }` из задач вместо полных объектов. Этого достаточно для подсчёта completed/total. Если нужны полные задачи — использовать `db.task.findByWorkspace` или `db.task.findByUser`.

**`findMyWorkspaceId`** — лёгкий метод, возвращающий только `{ id }` воркспейса. Используется в `/api/task?project=my`, где нужен только ID воркспейса, а не все его задачи и тиммейты.

### Фото пользователя

Фото пользователя **не хранится в БД**. Оно доступно только через Telegram webApp (`tgUser.photo_url` из `ITelegramUser`).

- `useUser()` возвращает `tgUser` с `photo_url` — это Telegram-объект, не БД-сущность
- Компоненты `Avatar`, `ProfileAvatar` берут фото из `tgUser?.photo_url`
- Для тиммейтов (данные из БД) фото недоступно — `TeammatesList` отображает placeholder
- В `UserInterface` / `UserDataInterface` поля `photo_url` нет — это интерфейсы БД-юзера
- В `ITelegramUser` (`src/shared/types/telegram.d.ts`) поле `photo_url` есть — это интерфейс Telegram

### Миграции и baseline

История миграций построена на едином baseline (`prisma/migrations/0_baseline/migration.sql`), который описывает полную схему БД. Старые инкрементальные миграции были заменены этим baseline из-за рассинхрона между файлами миграций и реальным состоянием БД.

**Если Prisma показывает drift при `migrate dev`:**
1. Проверить, что БД и `schema.prisma` реально синхронизированы
2. Если файлы миграций не совпадают с БД — пересоздать baseline:
   - Привести БД к нужному состоянию вручную (SQL)
   - Удалить старые папки миграций
   - Создать новый `0_baseline/migration.sql` с полной схемой
   - Очистить таблицу: `TRUNCATE "_prisma_migrations";`
   - Пометить как применённый: `npx prisma migrate resolve --applied 0_baseline`
3. **Никогда не редактировать уже применённые миграции** — Prisma хранит чексуммы и обнаружит изменения
