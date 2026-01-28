import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface LoadingPageProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    isAvatar?: boolean,
    additionalBlocks?: ReactNode,
}