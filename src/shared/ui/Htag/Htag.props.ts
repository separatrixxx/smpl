import { DetailedHTMLProps, HTMLAttributes, ReactNode, MouseEvent  } from 'react';


export interface HtagProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
	tag: 'm',
	children: ReactNode,
	onClick?: (e: MouseEvent<HTMLHeadingElement>) => void,
}
