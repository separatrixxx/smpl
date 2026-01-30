import { describe, it, expect } from 'vitest';
import { TasksDataInterface } from '@/entities/tasks/interfaces/tasks.interface';
import { getTodayTasksStats, getWorkspaceTitle } from '.';
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
    const todayStr = today.toISOString();
    const yday = new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString();

    const data: TasksDataInterface = {
        workspace_id: 1,
        todo: [
            makeTask(todayStr, 1, 'todo'),
            makeTask(yday, 2, 'todo'),
        ],
        progress: [
            makeTask(todayStr, 3, 'progress'),
        ],
        review: [],
        done: [
            makeTask(todayStr, 4, 'done'),
            makeTask(yday, 5, 'done'),
        ],
    };

    it('returns 0,0 if no data provided', () => {
        expect(getTodayTasksStats(undefined)).toEqual({ completed: 0, total: 0 });
    });

    it('returns correct counts for today tasks and done', () => {
        expect(getTodayTasksStats(data)).toEqual({
            completed: 1,
            total: 3
        });
    });

    it('returns 0,0 if no tasks for today', () => {
        const noToday: TasksDataInterface = {
            workspace_id: 2,
            todo: [makeTask(yday, 10, 'todo')],
            progress: [],
            review: [],
            done: [makeTask(yday, 11, 'done')],
        };

        expect(getTodayTasksStats(noToday)).toEqual({ completed: 0, total: 0 });
    });
});
