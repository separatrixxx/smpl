import { DetailedHTMLProps, HTMLAttributes, MouseEvent } from 'react';


export interface ButtonIconProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    type: 'folder' | 'pencil' | 'people' | 'bell',
    text: string,
    onClick?: (e: MouseEvent<HTMLElement>) => void,
}