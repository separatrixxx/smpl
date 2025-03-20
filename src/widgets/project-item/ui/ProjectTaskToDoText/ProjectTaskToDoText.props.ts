import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface ProjectTaskToDoTextProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    tasksCount: number,
}
