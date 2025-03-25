import { RefObject, useEffect, useRef } from 'react';


export const useFocusTrap = (trapRef: RefObject<HTMLDivElement | null>) => {
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        previouslyFocusedElement.current = document.activeElement as HTMLElement;

        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled]):not([type="hidden"])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
        ];

        const trap = trapRef.current;

        if (!trap) return;

        const focusableElements = trap.querySelectorAll<HTMLElement>(focusableSelectors.join(','));
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (focusableElements.length === 0) {
                e.preventDefault();
                return;
            }

            const active = document.activeElement;

            if (e.shiftKey) {
                if (active === first || !trap.contains(active)) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (active === last || !trap.contains(active)) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        first?.focus();

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            previouslyFocusedElement.current?.focus();
        };
    }, [trapRef]);
};
