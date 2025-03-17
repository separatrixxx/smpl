'use client'
import { WorkspaceOverviewProps } from './WorkspaceOverview.props';
import styles from './WorkspaceOverview.module.scss';
import { ReactElement } from "react";
import { Htag } from '@/shared/ui/Htag/Htag';
import { useSetup } from '@/shared/hooks/useSetup';
import { getLocaleText } from '@/shared/utils/locale/locale';
import { CalendarBadge } from '../CalendarBadge/CalendarBadge';


export const WorkspaceOverview = ({ completed, total }: WorkspaceOverviewProps): ReactElement => {
    const { tgUser } = useSetup();
    
    return (
        <div className={styles.workspaceOverview}>
            <CalendarBadge />
            <Htag tag='xl'>
                {getLocaleText(tgUser?.language_code, 'workspace_overview_text')
                    .replace("{user}", tgUser?.first_name || getLocaleText(tgUser?.language_code, 'guest'))
                    .replace("{completed}", String(completed))
                    .replace("{total}", String(total))}
            </Htag>
        </div>
    );
}