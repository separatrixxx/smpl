import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { TaskInterface } from '@/entities/tasks/interfaces/tasks.interface';


export interface TasksListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    tasksList: TaskInterface[],
    isTasksListLoading: boolean,
}

export interface TaskListItemProps {
    task: TaskInterface,
}

export interface TasksListWrapperProps {
    projectId?: number,
}
