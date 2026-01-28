'use client'
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { FocusTrapProps } from './FocusTrap.props';
import { useRef, ReactElement } from 'react';


export const FocusTrap = ({ children }: FocusTrapProps): ReactElement => {
    const trapRef = useRef<HTMLDivElement>(null);
    useFocusTrap(trapRef);

    return (
        <div ref={ trapRef }>
            { children }
        </div>
    );
};
