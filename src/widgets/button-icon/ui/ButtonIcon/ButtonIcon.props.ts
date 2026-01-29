import { DetailedHTMLProps, HTMLAttributes, MouseEvent } from 'react';
import { IconType } from '@/shared/ui/Icon/icons';


export interface ButtonIconProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    type: IconType,
    text: string,
    onClick?: (e: MouseEvent<HTMLElement>) => void,
}