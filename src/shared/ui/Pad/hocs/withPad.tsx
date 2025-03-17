import { Pad } from "../Pad";


export const withPad = <P extends object>(Component: React.ComponentType<P>) => {
    const WithPad = (props: P) => (
        <Pad>
            <Component {...props} />
        </Pad>
    );

    WithPad.displayName = `WithPad(${Component.displayName || Component.name || 'Component'})`;

    return WithPad;
};