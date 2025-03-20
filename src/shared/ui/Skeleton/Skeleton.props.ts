import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface SkeletonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	width: number | string,
    height: number | string,
    isReady: boolean,
    isRound?: boolean,
    ariaLabel?: string,
    role?: string,
	children?: ReactNode,
}
