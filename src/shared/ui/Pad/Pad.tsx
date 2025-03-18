import { PadProps } from './Pad.props';
import styles from './Pad.module.scss';
import { ReactElement } from "react";
import cn from 'classnames';


export const Pad = ({ children, className, onClick }: PadProps): ReactElement => {
    return (
        <section className={cn(styles.pad, className)} onClick={onClick}>
            {children}
        </section>
    );
}