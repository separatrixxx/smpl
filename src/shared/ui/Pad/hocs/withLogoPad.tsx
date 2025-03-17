import styles from '../Pad.module.scss';
import { Icon } from "../../Icon/Icon";
import { Pad } from "../Pad";


export const withLogoPad = <P extends object>(Component: React.ComponentType<P>) => {
    const WithLogoPad = (props: P) => (
        <Pad>
            <Component {...props} />
            <Icon type='logo' className={styles.padLogo} />
        </Pad>
    );

    WithLogoPad.displayName = `WithLogoPad(${Component.displayName || Component.name || 'Component'})`;

    return WithLogoPad;
};