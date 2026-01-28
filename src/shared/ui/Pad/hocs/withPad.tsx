import { Pad } from "../Pad";
import { MouseEvent } from 'react';


export const withPad = <P extends object>(Component: React.ComponentType<P>, onClick?: (e: MouseEvent<HTMLElement>) => void) => {
    const WithPad = ({ className, ...props }: P & { className?: string }) => (
        <Pad className={ className } onClick={ onClick }>
            <Component { ...props as P } />
        </Pad>
    );

    WithPad.displayName = `WithPad(${Component.displayName || Component.name || 'Component'})`;

    return WithPad;
};
