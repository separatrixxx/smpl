import { InputProps } from './Input.props';
import styles from './Input.module.scss';
import { ReactElement } from "react";
import cn from 'classnames';


export const Input = ({ placeholder, value, type, name, ariaLabel, isError, handleChange, onKeyDown }: InputProps): ReactElement => {
    return (
        <input className={ cn(styles.input, {
            [styles.error]: isError,
        }) }
            placeholder={ placeholder }
            value={ value }
            onChange={ handleChange }
            onKeyDown={ onKeyDown }
            type={ type || 'text' }
            name={ name }
            aria-label={ ariaLabel }
        />
    );
};
