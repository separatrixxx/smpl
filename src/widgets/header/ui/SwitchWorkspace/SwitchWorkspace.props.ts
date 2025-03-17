import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface SwitchWorkspaceProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    currWorkspaceId: number,
}