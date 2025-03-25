import { TaskType } from "@/shared/types/task-type";


export function getNextTaskType(type: TaskType): TaskType | null {
    switch (type) {
        case 'todo': return 'progress';
        case 'progress': return 'review';
        case 'review': return 'done';
        case 'done': return null;
        default:
            return type;
    }
}
