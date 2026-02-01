'use client';
import { AddTaskBarProps } from './AddTaskBar.props';
import styles from './AddTaskBar.module.scss';
import { ReactElement } from 'react';
import { ButtonIcon } from '@/widgets/button-icon';
import { useUser } from '@/shared/hooks/useUser';
import { getLocaleText } from '@/shared/utils/locale/locale';


export const AddTaskBar = ({ taskName, handleAddTask }: AddTaskBarProps): ReactElement => {
    const { tgUser } = useUser();

    const type = taskName ? 'pencil' : 'logo';

    return (
        <div className={ styles.addTaskBar }>
            <div></div>
            <ButtonIcon type={ type } text={ getLocaleText(tgUser?.language_code, 'add') }
                onClick={ taskName ? handleAddTask : () => { } } />
        </div>
    );
}