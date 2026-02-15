import { test, expect } from '@playwright/test';


const MOCK_TELEGRAM_ID = '862381667';

test.describe('API: /api/workspace', () => {
    test('GET /api/workspace?userId returns workspaces with tasks_info', async ({ request }) => {
        const response = await request.get(`/api/workspace?userId=${MOCK_TELEGRAM_ID}`);

        expect(response.status()).toBe(200);

        const data = await response.json();

        expect(data).toHaveProperty('workspaces');
        expect(Array.isArray(data.workspaces)).toBe(true);

        if (data.workspaces.length > 0) {
            const ws = data.workspaces[0];

            expect(ws).toHaveProperty('id');
            expect(ws).toHaveProperty('title');
            expect(ws).toHaveProperty('tasks_info');
            expect(ws.tasks_info).toHaveProperty('total');
            expect(ws.tasks_info).toHaveProperty('completed');
            expect(typeof ws.tasks_info.total).toBe('number');
            expect(typeof ws.tasks_info.completed).toBe('number');
            expect(ws.tasks_info.completed).toBeLessThanOrEqual(ws.tasks_info.total);
        }
    });

    test('GET /api/workspace/my returns workspace with tasks_info', async ({ request }) => {
        const response = await request.get(`/api/workspace/my?userId=${MOCK_TELEGRAM_ID}`);

        expect(response.status()).toBe(200);

        const data = await response.json();

        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('tasks_info');
        expect(data.tasks_info).toHaveProperty('total');
        expect(data.tasks_info).toHaveProperty('completed');
        expect(typeof data.tasks_info.total).toBe('number');
        expect(typeof data.tasks_info.completed).toBe('number');
    });
});

test.describe('API: /api/project', () => {
    test('GET /api/project?workspace returns projects with tasks_count and progress', async ({ request }) => {
        const wsResponse = await request.get(`/api/workspace/my?userId=${MOCK_TELEGRAM_ID}`);
        const ws = await wsResponse.json();

        const response = await request.get(`/api/project?workspace=${ws.id}`);

        expect(response.status()).toBe(200);

        const data = await response.json();

        expect(Array.isArray(data)).toBe(true);

        if (data.length > 0) {
            const project = data[0];

            expect(project).toHaveProperty('id');
            expect(project).toHaveProperty('title');
            expect(project).toHaveProperty('tasks_count');
            expect(project).toHaveProperty('progress');
            expect(typeof project.tasks_count).toBe('number');
            expect(typeof project.progress).toBe('number');
            expect(project.progress).toBeGreaterThanOrEqual(0);
            expect(project.progress).toBeLessThanOrEqual(100);
        }
    });
});

test.describe('API: /api/task', () => {
    test('GET /api/task?project=my returns grouped tasks', async ({ request }) => {
        const response = await request.get(
            `/api/task?project=my&userId=${MOCK_TELEGRAM_ID}`
        );

        expect(response.status()).toBe(200);

        const data = await response.json();

        expect(data).toHaveProperty('workspace_id');
        expect(data).toHaveProperty('todo');
        expect(data).toHaveProperty('progress');
        expect(data).toHaveProperty('review');
        expect(data).toHaveProperty('done');
        expect(Array.isArray(data.todo)).toBe(true);
        expect(Array.isArray(data.progress)).toBe(true);
        expect(Array.isArray(data.review)).toBe(true);
        expect(Array.isArray(data.done)).toBe(true);
    });

    test('task objects have required fields', async ({ request }) => {
        const response = await request.get(
            `/api/task?project=my&userId=${MOCK_TELEGRAM_ID}`
        );
        const data = await response.json();

        const allTasks = [
            ...data.todo,
            ...data.progress,
            ...data.review,
            ...data.done,
        ];

        if (allTasks.length > 0) {
            const task = allTasks[0];

            expect(task).toHaveProperty('id');
            expect(task).toHaveProperty('title');
            expect(task).toHaveProperty('type');
            expect(task).toHaveProperty('date');
            expect(task).toHaveProperty('serial');
        }
    });
});

test.describe('API: /api/teammate', () => {
    test('GET /api/teammate/:workspaceId returns teammates', async ({ request }) => {
        const wsResponse = await request.get(`/api/workspace?userId=${MOCK_TELEGRAM_ID}`);
        const wsData = await wsResponse.json();

        if (wsData.workspaces?.length > 0) {
            const workspaceId = wsData.workspaces[0].id;
            const response = await request.get(`/api/teammate/${workspaceId}`);

            expect(response.status()).toBe(200);

            const data = await response.json();

            expect(data).toHaveProperty('workspaceId');
            expect(data).toHaveProperty('teammates');
            expect(Array.isArray(data.teammates)).toBe(true);
        }
    });
});

test.describe('API: error handling', () => {
    test('GET /api/workspace/my without userId returns 400', async ({ request }) => {
        const response = await request.get('/api/workspace/my');

        expect(response.status()).toBe(400);
    });

    test('GET /api/workspace/999999 returns 404', async ({ request }) => {
        const response = await request.get('/api/workspace/999999');

        expect(response.status()).toBe(404);
    });

    test('GET /api/task?project=my without userId returns valid response', async ({ request }) => {
        const response = await request.get('/api/task?project=my');

        expect(response.ok()).toBe(true);
    });
});
