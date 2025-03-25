import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { PriorityType } from '@/shared/types/priority';
import { TaskType } from '@/shared/types/task-type';


export interface TaskItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string,
    isStarred: boolean,
    priority: PriorityType,
    date: string,
    type: TaskType,
}
