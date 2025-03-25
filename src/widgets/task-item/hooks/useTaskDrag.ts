'use client'
import { useResizeW } from '@/shared/hooks/useResize';
import { TaskType } from '@/shared/types/task-type';
import { useState, useRef, useEffect, useCallback } from 'react';
import { getNextTaskType } from '../utils/getNextTaskType';
import { useSetup } from '@/shared/hooks/useSetup';
import { loggerError } from '@/shared/utils/logger/logger';


const DRAG_THRESHOLD_PERCENT = 0.25;

export const useTaskDrag = (type: TaskType) => {
    const { webApp } = useSetup();

    const screenWidth = useResizeW();
    const [position, setPosition] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isThresholdReached, setIsThresholdReached] = useState<boolean>(false);
    const startXRef = useRef(0);

    const nextType = getNextTaskType(type);

    const triggerLightVibration = useCallback(() => {
        if (!webApp?.HapticFeedback?.notificationOccurred) return;

        try {
            webApp.HapticFeedback.notificationOccurred('success');
        } catch (e) {
            loggerError(`Vibration failed: ${e}`);
        }
    }, [webApp]);

    const handleStart = useCallback((clientX: number) => {
        if (!nextType) return;

        startXRef.current = clientX;

        setIsDragging(true);
        setIsThresholdReached(false);
    }, [nextType]);

    const handleMove = useCallback((clientX: number) => {
        if (!isDragging || !nextType) return;

        const diff = clientX - startXRef.current;

        setPosition(Math.max(0, diff));

        const threshold = screenWidth * DRAG_THRESHOLD_PERCENT;
        const reached = diff >= threshold;

        if (reached && !isThresholdReached) {
            triggerLightVibration();
        }

        setIsThresholdReached(diff >= threshold);
    }, [isDragging, nextType, screenWidth, isThresholdReached, triggerLightVibration]);

    const handleEnd = useCallback(() => {
        if (!isDragging || !nextType) return;

        setIsDragging(false);

        const shouldTriggerAction = isThresholdReached;

        setPosition(0);

        return shouldTriggerAction;
    }, [isDragging, nextType, isThresholdReached]);

    const onMouseDown = useCallback((e: React.MouseEvent) => handleStart(e.clientX), [handleStart]);

    useEffect(() => {
        if (!isDragging) return;

        const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
        const onMouseUp = () => {
            const result = handleEnd();

            if (result && nextType) {
                alert(`Перенесено в ${nextType}`);
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [isDragging, handleMove, handleEnd, nextType]);

    const onTouchStart = useCallback((e: React.TouchEvent) => handleStart(e.touches[0].clientX), [handleStart]);
    const onTouchMove = useCallback((e: React.TouchEvent) => handleMove(e.touches[0].clientX), [handleMove]);
    const onTouchEnd = useCallback(() => {
        const result = handleEnd();

        if (result && nextType) {
            alert(`Перенесено в ${nextType}`);
        }
    }, [handleEnd, nextType]);

    return {
        position,
        isDragging,
        isThresholdReached,
        dragHandlers: {
            onMouseDown,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
        },
        nextType,
        dragThreshold: screenWidth * DRAG_THRESHOLD_PERCENT,
    };
};
