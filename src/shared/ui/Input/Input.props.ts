import { DetailedHTMLProps, HTMLAttributes, ChangeEvent } from "react";


export interface InputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    placeholder: string,
    value: string,
    type?: string,
    name: string,
    ariaLabel: string,
    isError?: boolean,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
}
