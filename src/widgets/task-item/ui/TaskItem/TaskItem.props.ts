import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { PriorityType } from '@/shared/types/priority';


export interface TaskItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string,
    isStarred: boolean,
    priority: PriorityType,
    date: string,
    type: 'todo' | 'progress' | 'rewiew' | 'done',
}
