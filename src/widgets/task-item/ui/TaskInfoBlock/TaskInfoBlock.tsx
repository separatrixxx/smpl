'use client';
import { TaskInfoBlockProps } from './TaskInfoBlock.props';
import styles from './TaskInfoBlock.module.scss';
import { ReactElement, useState } from "react";
import { useSWRConfig } from 'swr';
import { PriorityBlock } from '../PriorityBlock/PriorityBlock';
import { Htag } from '@/shared/ui/Htag/Htag';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { changeTask } from '../../utils/changeTaskType';
import { getNextTaskType } from '../../utils/getNextTaskType';
import { useUser } from '@/shared/hooks/useUser';
import { useSetup } from '@/shared/hooks/useSetup';


export const TaskInfoBlock = ({ taskId, title, priority, type }: TaskInfoBlockProps): ReactElement => {
    const { tgUser } = useUser();
    const { workspace } = useSetup();
    const { mutate } = useSWRConfig();

    const [checked, setChecked] = useState<boolean>(false);

    const handleMutate = () => {
        mutate(`/api/task?project=my&userId=${tgUser?.id}`);
        mutate(`/api/task?workspace=${workspace}`);
    };

    const handleChangeTaskType = async () => {
        const nextType = getNextTaskType(type);

        if (nextType) {
            await changeTask({
                id: taskId,
                data: { type: nextType },
                onSuccess: handleMutate,
            });
            setChecked(!checked);
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