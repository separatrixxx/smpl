'use client'
import { WorkspaceOverviewProps } from './WorkspaceOverview.props';
import styles from './WorkspaceOverview.module.scss';
import { ReactElement } from "react";
import { Htag } from '@/shared/ui/Htag/Htag';
import { getLocaleText } from '@/shared/utils/locale/locale';
import { CalendarBadge } from '../CalendarBadge/CalendarBadge';
import { useUser } from '@/shared/hooks/useUser';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';


export const WorkspaceOverview = ({ completed, total }: WorkspaceOverviewProps): ReactElement => {
    const { tgUser } = useUser();

    const text = getLocaleText(tgUser?.language_code, 'workspace_overview_text')
        .replace("{user}", tgUser?.first_name || getLocaleText(tgUser?.language_code, 'guest'))
        .replace("{completed}", String(completed))
        .replace("{total}", String(total));

    const noTasksText = getLocaleText(tgUser?.language_code, 'workspace_overview_no_tasks_text')
        .replace("{user}", tgUser?.first_name || getLocaleText(tgUser?.language_code, 'guest'));

    const isReady = total !== undefined && completed !== undefined;
    
    return (
        <div className={ styles.workspaceOverview }>
            <CalendarBadge />
            <Skeleton width={ 200 } height={ 24 } isReady={ isReady }>
                <Htag tag='xl'>
                    { total === 0 ? noTasksText : text }
                </Htag>
            </Skeleton>
        </div>
    );
}