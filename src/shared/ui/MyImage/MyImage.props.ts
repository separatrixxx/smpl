import { DetailedHTMLProps, HTMLAttributes, MouseEvent } from 'react';


export interface MyImageProps extends DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    src: string,
    alt: string,
    width?: number,
    height?: number,
    style?: React.CSSProperties;
    priority?: boolean,
    onClick?: (e: MouseEvent<HTMLElement>) => void,
}