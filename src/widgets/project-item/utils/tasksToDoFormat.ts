import { getLocaleText } from "@/shared/utils/locale/locale";

function tasksToDoFormat(tasksCount: number): string {
    if (tasksCount === 0) {
        return 'no_tasks_to_do';
    } else if (tasksCount % 10 === 1 && tasksCount % 100 !== 11) {
        return 'task_to_do';
    } else if (2 <= tasksCount % 10 && tasksCount % 10 <= 4
        && !(12 <= tasksCount % 100 && tasksCount % 100 <= 14)) {
        return 'tasks_to_do_1';
    } else {
        return 'tasks_to_do_2';
    }
}

export function tasksToDo(tasksCount: number, locale: string): string {
    const formatText = getLocaleText(locale, tasksToDoFormat(tasksCount));

    if (tasksCount) {
        return `${tasksCount} ${formatText}`
    }

    return formatText;
}
