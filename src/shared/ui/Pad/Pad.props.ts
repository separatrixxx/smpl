import { DetailedHTMLProps, HTMLAttributes, ReactNode, MouseEvent } from 'react';


export interface PadProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    children: ReactNode,
    onClick?: (e: MouseEvent<HTMLElement>) => void,
}