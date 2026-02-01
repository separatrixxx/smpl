import { DetailedHTMLProps, HTMLAttributes, ChangeEvent, KeyboardEvent } from "react";


export interface InputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    placeholder: string,
    value: string,
    type?: string,
    name: string,
    ariaLabel: string,
    isError?: boolean,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void,
}
