'use client'
import { TaskInfoBlockProps } from './TaskInfoBlock.props';
import styles from './TaskInfoBlock.module.scss';
import { ReactElement, useState } from "react";
import { PriorityBlock } from '../PriorityBlock/PriorityBlock';
import { Htag } from '@/shared/ui/Htag/Htag';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';


export const TaskInfoBlock = ({ title, priority, type }: TaskInfoBlockProps): ReactElement => {
    const [checked, setChecked] = useState<boolean>(false);

    return (
        <div className={styles.taskInfoBlock}>
            <div className={styles.priorityBlock}>
                <PriorityBlock priority={priority} />
                <Htag tag='xl'>
                    {title}
                </Htag>
            </div>
            {
                type !== 'done' && <Checkbox isChecked={checked} onChange={() => setChecked(!checked)} />
            }
        </div>
    );
}