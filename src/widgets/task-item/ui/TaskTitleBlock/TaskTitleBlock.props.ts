import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface TaskTitleBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    date: string,
    isStarred: boolean,
}
