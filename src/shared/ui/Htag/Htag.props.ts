import { DetailedHTMLProps, HTMLAttributes, ReactNode, MouseEvent } from 'react';


export interface HtagProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
	tag: 'xl' | 'l' | 'm' | 's',
	children: ReactNode,
	onClick?: (e: MouseEvent<HTMLHeadingElement>) => void,
}

export interface ClientHtagProps extends Omit<HtagProps, 'children'> {
	text?: string,
}
