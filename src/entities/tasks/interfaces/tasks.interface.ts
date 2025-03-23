import { PriorityType } from "@/shared/types/priority";


export interface TaskInterface {
    id: number,
    workspace_id: number,
    project_id?: number
    title: string,
    is_starred: boolean,
    priority: PriorityType,
    date: string,
    type: 'todo' | 'progress' | 'rewiew' | 'done',
}
