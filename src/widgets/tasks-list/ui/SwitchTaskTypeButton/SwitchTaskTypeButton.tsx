'use client'
import { SwitchTaskTypeButtonProps } from './SwitchTaskTypeButton.props';
import styles from './SwitchTaskTypeButton.module.scss';
import { ReactElement } from "react";
import { useSetup } from '@/shared/hooks/useSetup';
import { getLocaleText } from '@/shared/utils/locale/locale';
import cn from 'classnames';


export const SwitchTaskTypeButton = ({ type, taskType, switchTaskType }: SwitchTaskTypeButtonProps): ReactElement => {
    const { tgUser } = useSetup();

    return (
        <button className={cn(styles.switchTaskTypeButton, {
            [styles.activeTaskType]: type === taskType,
        })} onClick={switchTaskType}>
            {getLocaleText(tgUser?.language_code, type)}
        </button>
    );
}
