import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface ModalHeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string,
    onClose: () => void,
}
