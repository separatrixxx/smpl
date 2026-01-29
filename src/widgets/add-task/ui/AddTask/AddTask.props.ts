import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface AddTaskProps extends DetailedHTMLProps<HTMLAttributes<HTMLBaseElement>, HTMLBaseElement> {
    isSheetOpen: boolean,
    setSheetOpen: (e: boolean) => void,
}
