import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface ProjectItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string,
    isStarred: boolean,
    tasksCount: number,
    progress: number,
}

export interface ProjectItemWrapperProps extends ProjectItemProps {
    workspaceId: number,
    projectId: number,
}
