import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface WorkspacesItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLinkElement>, HTMLLinkElement> {
    workspaceId: number,
    title: string,
    isMyWorkspace: boolean,
}