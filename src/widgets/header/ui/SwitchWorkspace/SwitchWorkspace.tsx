'use client'
import { Htag } from '@/shared/ui/Htag/Htag';
import styles from './SwitchWorkspace.module.scss';
import { ReactElement } from "react";
import { getLocaleText } from '@/shared/utils/locale/locale';
import { useSetup } from '@/shared/hooks/useSetup';
import { Icon } from '@/shared/ui/Icon/Icon';


export const SwitchWorkspace = (): ReactElement => {
    const { tgUser } = useSetup();

    return (
        <div className={styles.switchWorkspace}>
            <Icon type='chevron_down' size='s' />
            <Htag tag='m'>
                {getLocaleText(tgUser?.language_code, 'my_workspace')}
            </Htag>
        </div>
    );
}