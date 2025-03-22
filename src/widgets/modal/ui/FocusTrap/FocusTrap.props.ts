import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface FocusTrapProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode,
}
