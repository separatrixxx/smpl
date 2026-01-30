import { describe, it, expect } from 'vitest';
import { TasksDataInterface } from '@/entities/tasks/interfaces/tasks.interface';
import { getTodayTasksStats, getWorkspaceOverviewTextType, getWorkspaceTitle } from '.';
import { TaskType } from '@/shared/types/task-type';


const makeTask = (date: string, id: number, type: TaskType): any => ({
    id,
    title: `Task ${id}`,
    is_starred: false,
    priority: 1,
    date,
    type,
});

describe('getWorkspaceTitle', () => {
    it('returns "my_workspace" locale text if isMyWorkspace=true', () => {
        expect(getWorkspaceTitle('en', 'Custom Title', true)).toBe('My workspace');
        expect(getWorkspaceTitle('ru', 'Custom Title', true)).toBe('Мой воркспейс');
    });

    it('returns the given title if isMyWorkspace is false', () => {
        expect(getWorkspaceTitle('en', 'Custom Title', false)).toBe('Custom Title');
        expect(getWorkspaceTitle('ru', 'Заголовок', false)).toBe('Заголовок');
    });

    it('returns "workspace" locale text if no title provided and isMyWorkspace is false', () => {
        expect(getWorkspaceTitle('en')).toBe('Workspace');
        expect(getWorkspaceTitle('ru')).toBe('Воркспейс');
    });
});

describe('getTodayTasksStats', () => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const ydayStr = yesterday.toISOString().split('T')[0];

    const data: TasksDataInterface = {
        workspace_id: 1,
        todo: [
            makeTask(`${todayStr}T10:00:00.000Z`, 1, 'todo'),
            makeTask(`${ydayStr}T23:59:59.999Z`, 2, 'todo'),
        ],
        progress: [
            makeTask(`${todayStr}T15:30:00.000Z`, 3, 'progress'),
        ],
        review: [],
        done: [
            makeTask(`${todayStr}T08:00:00.000Z`, 4, 'done'),
            makeTask(`${ydayStr}T12:00:00.000Z`, 5, 'done'),
        ],
    };

    it('returns 0,0 if no data provided', () => {
        expect(getTodayTasksStats(undefined)).toEqual({ completed: 0, total: 0 });
    });

    it('returns correct counts for today tasks and done', () => {
        expect(getTodayTasksStats(data)).toEqual({
            completed: 1,
            total: 3,
        });
    });

    it('returns 0,0 if no tasks for today', () => {
        const noToday: TasksDataInterface = {
            workspace_id: 2,
            todo: [makeTask(`${ydayStr}T10:00:00.000Z`, 10, 'todo')],
            progress: [],
            review: [],
            done: [makeTask(`${ydayStr}T14:00:00.000Z`, 11, 'done')],
        };

        expect(getTodayTasksStats(noToday)).toEqual({ completed: 0, total: 0 });
    });

    it('correctly handles tasks with different times on same day', () => {
        const sameDay: TasksDataInterface = {
            workspace_id: 3,
            todo: [makeTask(`${todayStr}T00:00:00.000Z`, 20, 'todo')],
            progress: [makeTask(`${todayStr}T12:30:45.123Z`, 21, 'progress')],
            review: [makeTask(`${todayStr}T23:59:59.999Z`, 22, 'review')],
            done: [
                makeTask(`${todayStr}T08:15:00.000Z`, 23, 'done'),
                makeTask(`${todayStr}T20:00:00.000Z`, 24, 'done'),
            ],
        };

        expect(getTodayTasksStats(sameDay)).toEqual({
            completed: 2,
            total: 5,
        });
    });
});

describe('getWorkspaceOverviewTextType', () => {
    it('returns no_tasks when completed is undefined', () => {
        expect(getWorkspaceOverviewTextType(undefined, 5)).toBe('no_tasks');
    });

    it('returns no_tasks when total is undefined', () => {
        expect(getWorkspaceOverviewTextType(3, undefined)).toBe('no_tasks');
    });

    it('returns no_tasks when both are undefined', () => {
        expect(getWorkspaceOverviewTextType(undefined, undefined)).toBe('no_tasks');
    });

    it('returns all_done when total equals completed', () => {
        expect(getWorkspaceOverviewTextType(5, 5)).toBe('all_done');
    });

    it('returns all_done when both are zero', () => {
        expect(getWorkspaceOverviewTextType(0, 0)).toBe('all_done');
    });

    it('returns remaining when there are uncompleted tasks', () => {
        expect(getWorkspaceOverviewTextType(2, 5)).toBe('remaining');
    });
});
