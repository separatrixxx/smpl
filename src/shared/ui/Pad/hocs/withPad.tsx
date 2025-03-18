import { Pad } from "../Pad";
import { MouseEvent } from 'react';


export const withPad = <P extends object>(Component: React.ComponentType<P>, onClick?: (e: MouseEvent<HTMLElement>) => void) => {
    const WithPad = (props: P) => (
        <Pad onClick={onClick}>
            <Component {...props} />
        </Pad>
    );

    WithPad.displayName = `WithPad(${Component.displayName || Component.name || 'Component'})`;

    return WithPad;
};