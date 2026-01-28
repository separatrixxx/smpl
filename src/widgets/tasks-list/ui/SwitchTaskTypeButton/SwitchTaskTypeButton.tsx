'use client'
import { SwitchTaskTypeButtonProps } from './SwitchTaskTypeButton.props';
import styles from './SwitchTaskTypeButton.module.scss';
import { ReactElement } from "react";
import { getLocaleText } from '@/shared/utils/locale/locale';
import { useUser } from '@/shared/hooks/useUser';
import cn from 'classnames';


export const SwitchTaskTypeButton = ({ type, taskType, switchTaskType }: SwitchTaskTypeButtonProps): ReactElement => {
    const { tgUser } = useUser();

    return (
        <button className={ cn(styles.switchTaskTypeButton, {
            [styles.activeTaskType]: type === taskType,
        }) } onClick={ switchTaskType }>
            { getLocaleText(tgUser?.language_code, type) }
        </button>
    );
}
