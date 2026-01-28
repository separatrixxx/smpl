import { DetailedHTMLProps, HTMLAttributes, MouseEvent  } from 'react';
import { IconType } from './icons';


export interface IconProps extends DetailedHTMLProps<HTMLAttributes<HTMLOrSVGElement>, HTMLOrSVGElement> {
	type: IconType,
    size?: 'l' | 'm' | 's',
	color?: 'primary' | 'bg' | 'hint',
	onClick?: (e: MouseEvent<HTMLOrSVGElement>) => void,
}

