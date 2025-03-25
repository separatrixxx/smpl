'use client'
import styles from './SwitchTaskTypeBlock.module.scss';
import { ReactElement } from "react";
import { TaskType } from '@/shared/types/task-type';
import { useSetup } from '@/shared/hooks/useSetup';
import { SwitchTaskTypeButton } from '../SwitchTaskTypeButton/SwitchTaskTypeButton';


export const SwitchTaskTypeBlock = (): ReactElement => {
    const { taskType, setTaskType } = useSetup();

    const taskTypes: TaskType[] = ['todo', 'progress', 'review', 'done'];
    
    return (
        <div className={styles.switchTaskTypeBlock}>
            {taskTypes.map(t => (
                <SwitchTaskTypeButton key={t} type={t} taskType={taskType}
                    switchTaskType={() => setTaskType(t)} />
            ))}
        </div>
    );
}
