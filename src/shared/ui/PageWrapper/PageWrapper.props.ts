import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface PageWrapperProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    isMoreGap?: boolean,
    children: ReactNode,
}