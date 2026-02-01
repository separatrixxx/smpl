'use client';
import { AddTaskBarProps } from './AddTaskBar.props';
import styles from './AddTaskBar.module.scss';
import { ReactElement } from 'react';
import { ButtonIcon } from '@/widgets/button-icon';
import { useUser } from '@/shared/hooks/useUser';
import { getLocaleText } from '@/shared/utils/locale/locale';
import { Spinner } from '@/shared/ui/Spinner/Spinner';


export const AddTaskBar = ({ taskName, isLoading, handleAddTask }: AddTaskBarProps): ReactElement => {
    const { tgUser } = useUser();

    const type = taskName ? 'pencil' : 'logo';

    return (
        <div className={ styles.addTaskBar }>
            <div></div>
            {
                isLoading ? <Spinner size={ 30 } /> :
                    <ButtonIcon type={ type } text={ getLocaleText(tgUser?.language_code, 'add') }
                        onClick={ taskName ? handleAddTask : () => { } } />
            }
        </div>
    );
}