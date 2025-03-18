import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface SkeletonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	width: number,
    height: number,
    isReady: boolean,
    isRound?: boolean,
    ariaLabel: string,
	children?: ReactNode,
}
