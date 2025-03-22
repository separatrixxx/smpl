import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string,
    isOpen: boolean,
    children: ReactNode,
    onClose: () => void,
}
