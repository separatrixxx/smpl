'use client';
import { TaskInfoBlockProps } from './TaskInfoBlock.props';
import styles from './TaskInfoBlock.module.scss';
import { ReactElement, useState } from "react";
import { PriorityBlock } from '../PriorityBlock/PriorityBlock';
import { Htag } from '@/shared/ui/Htag/Htag';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { changeTask } from '../../utils/changeTaskType';
import { getNextTaskType } from '../../utils/getNextTaskType';
import { useSetup } from '@/shared/hooks/useSetup';


export const TaskInfoBlock = ({ taskId, title, priority, type }: TaskInfoBlockProps): ReactElement => {
    const { moveTask } = useSetup();

    const [checked, setChecked] = useState<boolean>(false);

    const handleChangeTaskType = () => {
        const nextType = getNextTaskType(type);

        if (nextType) {
            setChecked(true);

            setTimeout(() => {
                moveTask(taskId, type, nextType);
            }, 300);

            changeTask({
                id: taskId,
                data: { type: nextType },
            });
        }
    };

    return (
        <div className={ styles.taskInfoBlock }>
            <div className={ styles.priorityBlock }>
                <PriorityBlock priority={ priority } />
                <Htag tag='xl'>
                    { title }
                </Htag>
            </div>
            {
                type !== 'done' && <Checkbox isChecked={ checked } onChange={ handleChangeTaskType } />
            }
        </div>
    );
}