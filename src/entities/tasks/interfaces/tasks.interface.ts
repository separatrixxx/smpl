import { PriorityType } from "@/shared/types/priority";
import { TaskType } from "@/shared/types/task-type";


export interface TasksDataInterface {
    workspace_id: number,
    project_id?: number,
    todo: TaskInterface[],
    progress: TaskInterface[],
    review: TaskInterface[],
    done: TaskInterface[],
}

export interface TaskInterface {
    id: number,
    title: string,
    is_starred: boolean,
    priority: PriorityType,
    date: string,
    type: TaskType,
    serial: string,
}

export interface TaskTypeStateInterface {
    taskType: TaskType,
    setTaskType: (taskType: TaskType) => void,
}

export interface TasksStateInterface {
    tasks: TasksDataInterface | null,
    setTasks: (tasks: TasksDataInterface) => void,
}

export interface CreateTaskInterface {
    workspace_id: number,
    project_id?: number,
    telegram_id?: string | number,
    title: string,
    is_starred?: boolean,
    priority?: PriorityType,
    date: string,
    type?: TaskType,
}

export interface UpdateTaskInterface {
    title?: string,
    type?: TaskType,
}
