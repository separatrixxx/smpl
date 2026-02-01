import { TasksDataInterface } from "@/entities/tasks/interfaces/tasks.interface";
import { getLocaleText } from "../locale/locale";


export function getWorkspaceTitle(lang?: string, title?: string, isMyWorkspace?: boolean): string {
    const correctTitle = title ? title : getLocaleText(lang, 'workspace');

    return isMyWorkspace ? getLocaleText(lang, 'my_workspace') : correctTitle;
}

export function getTodayTasksStats(data?: TasksDataInterface | null) {
    if (!data) {
        return {
            completed: 0,
            total: 0,
        };
    }

    const { todo, progress, review, done } = data;

    const today = new Date();
    const todayDateString = today.toISOString().split('T')[0];

    const isTaskToday = (task: any) => {
        const taskDate = new Date(task.date).toISOString().split('T')[0];
        return taskDate === todayDateString;
    };

    const allTasks = [...todo, ...progress, ...review, ...done];
    const todayTasks = allTasks.filter(isTaskToday);
    const todayDone = done.filter(isTaskToday);

    return {
        completed: todayDone.length,
        total: todayTasks.length,
    };
}

export type WorkspaceOverviewTextType = 'no_tasks' | 'all_done' | 'remaining';

export function getWorkspaceOverviewTextType(completed?: number, total?: number): WorkspaceOverviewTextType {
    if (completed === undefined || total === undefined) {
        return 'no_tasks';
    }

    if (total - completed === 0) {
        return 'all_done';
    }

    return 'remaining';
}
