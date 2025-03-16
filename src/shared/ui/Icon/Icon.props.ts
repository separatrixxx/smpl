import { DetailedHTMLProps, HTMLAttributes, MouseEvent  } from 'react';


export interface IconProps extends DetailedHTMLProps<HTMLAttributes<HTMLOrSVGElement>, HTMLOrSVGElement> {
	type: 'logo' | 'chevron_down' | 'chevron_up' | 'chevron_left' | 'chevron_right' | 'calendar',
    size?: 'l' | 'm' | 's',
	onClick?: (e: MouseEvent<HTMLOrSVGElement>) => void,
}
