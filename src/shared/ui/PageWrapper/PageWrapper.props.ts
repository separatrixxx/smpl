import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface PageWrapperProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    children: ReactNode,
}