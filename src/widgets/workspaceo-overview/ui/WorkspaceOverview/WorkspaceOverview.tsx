'use client'
import styles from './WorkspaceOverview.module.scss';
import { ReactElement } from "react";
import { Htag } from '@/shared/ui/Htag/Htag';
import { useSetup } from '@/shared/hooks/useSetup';
import { getLocaleText } from '@/shared/utils/locale/locale';
import { CalendarBadge } from '../CalendarBadge/CalendarBadge';


export const WorkspaceOverview = (): ReactElement => {
    const { tgUser } = useSetup();

    const completed = 3;
    const total = 10;
    
    return (
        <div className={styles.workspaceOverview}>
            <CalendarBadge />
            <Htag tag='l'>
                {getLocaleText(tgUser?.language_code, 'workspace_overview_text')
                    .replace("{user}", tgUser?.first_name || getLocaleText(tgUser?.language_code, 'guest'))
                    .replace("{completed}", String(completed))
                    .replace("{total}", String(total))}
            </Htag>
        </div>
    );
}