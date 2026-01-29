import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { PriorityType } from '@/shared/types/priority';
import { TaskType } from '@/shared/types/task-type';


export interface TaskInfoBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    taskId: number,
    title: string,
    priority: PriorityType,
    type: TaskType,
}
