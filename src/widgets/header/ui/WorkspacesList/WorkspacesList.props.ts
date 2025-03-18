import { WorkspaceInterface } from '@/entities/workspace/interfaces/workspace.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface WorkspacesListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    currWorkspaceId: number,
    workspaces: WorkspaceInterface[],
}