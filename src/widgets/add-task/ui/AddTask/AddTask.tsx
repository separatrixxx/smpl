'use client';
import { AddTaskProps } from './AddTask.props';
import { ReactElement, useState, KeyboardEvent } from 'react';
import { useUser } from '@/shared/hooks/useUser';
import { getLocaleText } from '@/shared/utils/locale/locale';
import { Modal } from '@/widgets/modal';
import { Input } from '@/shared/ui/Input/Input';
import { PriorityType } from '@/shared/types/priority';
import { AddTaskBar } from '../AddTaskBar/AddTaskBar';
import { addTask } from '../../utils/addTask';
import { useSetup } from '@/shared/hooks/useSetup';


export const AddTask = ({ isSheetOpen, setSheetOpen }: AddTaskProps): ReactElement => {
    const { tgUser } = useUser();
    const { workspace, addTask: addTaskToStore, replaceTask } = useSetup();

    const [taskName, setTaskName] = useState<string>('');
    const [priority, setPriority] = useState<PriorityType>(1);

    const [taskNameError, setTaskNameError] = useState<boolean>(false);

    const handleCloseSheet = () => {
        setTaskName('');
        setPriority(1);

        setSheetOpen(false);
    };

    const handleAddTask = () => addTask({
        workspaceId: workspace,
        telegramId: tgUser?.id,
        taskName: taskName.trim(),
        priority,
        setTaskNameError,
        handleCloseSheet,
        addTaskToStore,
        replaceTaskInStore: replaceTask,
    });

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <>
            <Modal title={ getLocaleText(tgUser.language_code, 'add_task') } isOpen={ isSheetOpen } onClose={ handleCloseSheet }>
                <Input placeholder={ getLocaleText(tgUser?.language_code, 'task_name') } value={ taskName }
                    name='task name' ariaLabel='task name' isError={ taskNameError }
                    handleChange={ (e) => setTaskName(e.target.value) } onKeyDown={ handleKeyDown } />
                <AddTaskBar taskName={ taskName.trim() } handleAddTask={ handleAddTask } />
            </Modal>
        </>
    );
}