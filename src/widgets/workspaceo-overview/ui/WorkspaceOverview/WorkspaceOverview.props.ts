import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface WorkspaceOverviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    completed?: number,
    total?: number,
}