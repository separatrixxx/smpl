import { DetailedHTMLProps, HTMLAttributes, ChangeEvent } from 'react';


export interface CheckboxProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    isChecked: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}
