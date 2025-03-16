import styles from '../Pad.module.scss';
import { Icon } from "../../Icon/Icon";
import { Pad } from "../Pad";


export const withLogoPad = (Component: React.ComponentType) => {
    const WithLogoPad = () => (
        <Pad>
            <Component />
            <Icon type='logo' className={styles.padLogo} />
        </Pad>
    );

    WithLogoPad.displayName = `WithLogoPad(${Component.displayName || Component.name || 'Component'})`;

    return WithLogoPad;
};