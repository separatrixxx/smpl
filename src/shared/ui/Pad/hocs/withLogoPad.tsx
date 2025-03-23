import styles from '../Pad.module.scss';
import { Icon } from "../../Icon/Icon";
import { Pad } from "../Pad";
import { MouseEvent } from 'react';


export const withLogoPad = <P extends object>(Component: React.ComponentType<P>, onClick?: (e: MouseEvent<HTMLElement>) => void) => {
    const WithLogoPad = (props: P) => (
        <Pad onClick={onClick}>
            <Component {...props} />
            <Icon type='logo' color='primary' className={styles.padLogo} />
        </Pad>
    );

    WithLogoPad.displayName = `WithLogoPad(${Component.displayName || Component.name || 'Component'})`;

    return WithLogoPad;
};