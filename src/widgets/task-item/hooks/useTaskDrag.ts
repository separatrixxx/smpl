'use client';
import { useResizeW } from '@/shared/hooks/useResize';
import { TaskType } from '@/shared/types/task-type';
import { useState, useRef, useEffect, useCallback } from 'react';
import { getNextTaskType } from '../utils/getNextTaskType';
import { useSetup } from '@/shared/hooks/useSetup';
import { loggerError } from '@/shared/utils/logger/logger';
import { changeTask } from '../utils/changeTaskType';


const DRAG_THRESHOLD_PERCENT = 0.25;
const MAX_INITIAL_ANGLE = 30;

export const useTaskDrag = (taskId: number, type: TaskType) => {
    const { webApp, moveTask } = useSetup();

    const screenWidth = useResizeW();
    const [position, setPosition] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isThresholdReached, setIsThresholdReached] = useState<boolean>(false);
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const hasValidDragStartedRef = useRef(false); 

    const nextType = getNextTaskType(type);

    const triggerLightVibration = useCallback(() => {
        if (!webApp?.HapticFeedback?.notificationOccurred) {
            return;
        }

        try {
            webApp.HapticFeedback.notificationOccurred('success');
        } catch (e) {
            loggerError(`Vibration failed: ${e}`);
        }
    }, [webApp]);

    const isValidInitialDrag = (diffX: number, diffY: number) => {
        if (diffX <= 0) {
            return false;
        }

        const angle = Math.abs(Math.atan2(diffY, diffX) * (180 / Math.PI));

        return angle <= MAX_INITIAL_ANGLE;
    };

    const handleStart = useCallback((clientX: number, clientY: number) => {
        if (!nextType) {
            return;
        }

        startXRef.current = clientX;
        startYRef.current = clientY;
        hasValidDragStartedRef.current = false;

        setIsDragging(true);
        setIsThresholdReached(false);
    }, [nextType]);

    const handleMove = useCallback((clientX: number, clientY: number) => {
        if (!isDragging || !nextType) {
            return;
        }

        const diffX = clientX - startXRef.current;
        const diffY = clientY - startYRef.current;

        if (!hasValidDragStartedRef.current) {
            if (!isValidInitialDrag(diffX, diffY)) {
                setIsDragging(false);

                return;
            }
            hasValidDragStartedRef.current = true;
        }

        setPosition(Math.max(0, diffX));

        const threshold = screenWidth * DRAG_THRESHOLD_PERCENT;
        const reached = diffX >= threshold;

        if (reached && !isThresholdReached) {
            triggerLightVibration();
        }

        setIsThresholdReached(reached);
    }, [isDragging, nextType, screenWidth, isThresholdReached, triggerLightVibration]);

    const handleEnd = useCallback(() => {
        if (!isDragging || !nextType) {
            return;
        }

        setIsDragging(false);

        hasValidDragStartedRef.current = false;

        const shouldTriggerAction = isThresholdReached;

        setPosition(0);

        return shouldTriggerAction;
    }, [isDragging, nextType, isThresholdReached]);

    const onMouseDown = useCallback((e: React.MouseEvent) => 
        handleStart(e.clientX, e.clientY), 
    [handleStart]);

    useEffect(() => {
        if (!isDragging) {
            return;
        }

        const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        const onMouseUp = () => {
            setIsThresholdReached(false);

            const result = handleEnd();

            if (result && nextType && taskId >= 0) {
                setTimeout(() => {
                    moveTask(taskId, type, nextType);
                }, 200);

                changeTask({
                    id: taskId,
                    data: { type: nextType },
                });
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [isDragging, handleMove, handleEnd, nextType, taskId, moveTask, type]);

    const onTouchStart = useCallback((e: React.TouchEvent) => 
        handleStart(e.touches[0].clientX, e.touches[0].clientY), 
    [handleStart]);

    const onTouchMove = useCallback((e: React.TouchEvent) => 
        handleMove(e.touches[0].clientX, e.touches[0].clientY), 
    [handleMove]);

    const onTouchEnd = useCallback(() => {
        const result = handleEnd();
        setIsThresholdReached(false);

        if (result && nextType && taskId >= 0) {
            setTimeout(() => {
                moveTask(taskId, type, nextType);
            }, 200);

            changeTask({
                id: taskId,
                data: { type: nextType },
            });
        }
    }, [handleEnd, nextType, taskId, moveTask, type]);

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
