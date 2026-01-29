import { TasksDataInterface } from "@/entities/tasks/interfaces/tasks.interface";
import { getLocaleText } from "../locale/locale";
import { isToday } from 'date-fns';


export function getWorkspaceTitle(lang?: string, title?: string, isMyWorkspace?: boolean): string {
    const correctTitle = title ? title : getLocaleText(lang, 'workspace');

    return isMyWorkspace ? getLocaleText(lang, 'my_workspace') : correctTitle;
}

export function getTodayTasksStats(data?: TasksDataInterface) {
    if (!data) {
        return {
            completed: 0,
            total: 0,
        };
    }

    const { todo, progress, review, done } = data;

    const allTasks = [...todo, ...progress, ...review, ...done];
    const todayTasks = allTasks.filter(task => isToday(new Date(task.date)));
    const todayDone = done.filter(task => isToday(new Date(task.date)));

    return {
        completed: todayDone.length,
        total: todayTasks.length,
    };
}
