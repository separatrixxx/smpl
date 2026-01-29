import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface NoTextProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    text: string,
}
