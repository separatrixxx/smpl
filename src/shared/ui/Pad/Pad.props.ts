import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface PadProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    children: ReactNode,
}