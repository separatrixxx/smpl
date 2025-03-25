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

export interface MyTasksDataInterface {
    progress: TaskInterface[],
}

export interface TaskInterface {
    id: number,
    title: string,
    is_starred: boolean,
    priority: PriorityType,
    date: string,
    type: TaskType,
}

export interface TaskStateInterface {
    taskType: TaskType,
    setTaskType: (taskType: TaskType) => void,
}
