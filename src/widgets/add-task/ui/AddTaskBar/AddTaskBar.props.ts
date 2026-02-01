import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface AddTaskBarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    taskName: string,
    handleAddTask: () => void,
}
