import { DetailedHTMLProps, HTMLAttributes, ReactNode, MouseEvent } from 'react';


export interface PadProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    isSmall?: boolean,
    children: ReactNode,
    onClick?: (e: MouseEvent<HTMLElement>) => void,
}