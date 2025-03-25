import { TaskType } from '@/shared/types/task-type';
import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface SwitchTaskTypeButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    type: TaskType,
    taskType: TaskType,
    switchTaskType: () => void,
}
