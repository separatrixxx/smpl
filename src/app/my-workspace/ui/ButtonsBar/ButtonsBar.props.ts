import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface ButtonsBarProps extends DetailedHTMLProps<HTMLAttributes<HTMLBaseElement>, HTMLBaseElement> {
    setSheetOpen: (e: boolean) => void,
}
