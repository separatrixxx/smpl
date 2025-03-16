import { Pad } from "../Pad";


export const withPad = (Component: React.ComponentType) => {
    const WithPad = () => (
        <Pad>
            <Component />
        </Pad>
    );

    WithPad.displayName = `WithPad(${Component.displayName || Component.name || 'Component'})`;

    return WithPad;
};