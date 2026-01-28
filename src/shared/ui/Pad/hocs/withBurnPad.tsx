import styles from '../Pad.module.scss';
import { Icon } from "../../Icon/Icon";
import { Pad } from "../Pad";
import { MouseEvent } from 'react';


export const withBurnPad = <P extends object>(Component: React.ComponentType<P>, onClick?: (e: MouseEvent<HTMLElement>) => void) => {
    const withBurnPad = ({ className, ...props }: P & { className?: string }) => (
        <Pad className={ className } onClick={ onClick }>
            <Component { ...props as P } />
            <Icon type='burn' color='primary' className={ styles.padBurn } />
        </Pad>
    );

    withBurnPad.displayName = `withBurnPad(${Component.displayName || Component.name || 'Component'})`;

    return withBurnPad;
};