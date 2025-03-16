import { PadProps } from './Pad.props';
import styles from './Pad.module.scss';
import { ReactElement } from "react";


export const Pad = ({ children }: PadProps): ReactElement => {
    return (
        <section className={styles.pad}>
            {children}
        </section>
    );
}