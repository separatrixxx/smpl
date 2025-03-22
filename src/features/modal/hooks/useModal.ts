import { useEffect, useRef, useState } from 'react';


export const useModal = (isOpen: boolean, onClose: () => void) => {
    const sheetRef = useRef<HTMLDivElement | null>(null);
    const startY = useRef<number | null>(null);
    const [dragY, setDragY] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        startY.current = e.clientY;
        setIsDragging(true);

        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging || startY.current === null) return;

        const delta = e.clientY - startY.current;

        if (delta > 0) setDragY(delta);
    };

    const handlePointerUp = () => {
        setIsDragging(false);

        if (dragY > 100) {
            onClose();
        } else {
            setDragY(0);
        }

        startY.current = null;
    };

    useEffect(() => {
        if (!isOpen) {
            setDragY(0);
            setIsDragging(false);
            
            startY.current = null;
        }
    }, [isOpen]);

    return {
        sheetRef,
        dragY,
        isDragging,
        handleBackdropClick,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
    };
};
