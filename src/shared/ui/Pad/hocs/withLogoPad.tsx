import styles from '../Pad.module.scss';
import { Icon } from "../../Icon/Icon";
import { Pad } from "../Pad";
import { MouseEvent } from 'react';


export const withLogoPad = <P extends object>(Component: React.ComponentType<P>, onClick?: (e: MouseEvent<HTMLElement>) => void) => {
    const WithLogoPad = ({ className, ...props }: P & { className?: string }) => (
        <Pad className={className} onClick={onClick}>
            <Component {...props as P} />
            <Icon type='logo' color='primary' className={styles.padLogo} />
        </Pad>
    );

    WithLogoPad.displayName = `WithLogoPad(${Component.displayName || Component.name || 'Component'})`;

    return WithLogoPad;
};