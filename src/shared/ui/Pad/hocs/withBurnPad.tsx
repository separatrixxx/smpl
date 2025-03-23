import styles from '../Pad.module.scss';
import { Icon } from "../../Icon/Icon";
import { Pad } from "../Pad";
import { MouseEvent } from 'react';


export const withBurnPad = <P extends object>(Component: React.ComponentType<P>, onClick?: (e: MouseEvent<HTMLElement>) => void) => {
    const withBurnPad = (props: P) => (
        <Pad onClick={onClick}>
            <Component {...props} />
            <Icon type='burn' color='primary' className={styles.padBurn} />
        </Pad>
    );

    withBurnPad.displayName = `withBurnPad(${Component.displayName || Component.name || 'Component'})`;

    return withBurnPad;
};