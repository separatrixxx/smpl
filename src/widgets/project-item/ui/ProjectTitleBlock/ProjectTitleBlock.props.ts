import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface ProjectTitleBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string,
    isStarred: boolean,
}
