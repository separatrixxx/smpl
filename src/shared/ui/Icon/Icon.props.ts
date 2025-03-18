import { DetailedHTMLProps, HTMLAttributes, MouseEvent  } from 'react';


type IconType = 'logo' | 'chevron_down' | 'chevron_up' | 'chevron_left' | 'chevron_right' 
	| 'calendar' | 'folder' | 'pencil' | 'people' | 'bell' | 'plus';

export interface IconProps extends DetailedHTMLProps<HTMLAttributes<HTMLOrSVGElement>, HTMLOrSVGElement> {
	type: IconType,
    size?: 'l' | 'm' | 's',
	color?: 'primary' | 'bg' | 'hint',
	onClick?: (e: MouseEvent<HTMLOrSVGElement>) => void,
}

