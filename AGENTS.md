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
- `User` - пользователь (id, telegram_id, first_name, last_name, username, photo_url). `telegram_id` - уникальный идентификатор из Telegram (BigInt)
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

Для каждой функции (кроме совсем тривиальных) должны быть написаны unit-тесты. Они пишутся ишутся на vitest. Файлы тестов рядом с кодом, название *.spec.ts. Названия тестов всегда на английском, комментарии не нужны кроме неочевидных случаев. Для каждой функции свой describe, внутри несколько it с различными тесткейсами. Они должны тестировать разные вещи: не пиши несколько повторяющихся тестов.

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
