import { PadProps } from './Pad.props';
import styles from './Pad.module.scss';
import { ReactElement } from "react";
import cn from 'classnames';


export const Pad = ({ isSmall, children, className, onClick }: PadProps): ReactElement => {
    return (
        <section className={cn(styles.pad, className, {
            [styles.smallPad]: isSmall,
        })} onClick={onClick}>
            {children}
        </section>
    );
}