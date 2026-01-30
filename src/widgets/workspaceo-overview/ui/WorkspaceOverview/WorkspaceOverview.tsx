'use client';
import { WorkspaceOverviewProps } from './WorkspaceOverview.props';
import styles from './WorkspaceOverview.module.scss';
import { ReactElement } from "react";
import { Htag } from '@/shared/ui/Htag/Htag';
import { getLocaleText } from '@/shared/utils/locale/locale';
import { getWorkspaceOverviewTextType } from '@/shared/utils/common';
import { CalendarBadge } from '../CalendarBadge/CalendarBadge';
import { useUser } from '@/shared/hooks/useUser';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';


export const WorkspaceOverview = ({ completed, total }: WorkspaceOverviewProps): ReactElement => {
    const { tgUser } = useUser();

    const userName = tgUser?.first_name || getLocaleText(tgUser?.language_code, 'guest');
    const textType = getWorkspaceOverviewTextType(completed, total);

    const textMap = {
        no_tasks: getLocaleText(tgUser?.language_code, 'workspace_overview_no_tasks_text')
            .replace("{user}", userName),
        all_done: getLocaleText(tgUser?.language_code, 'workspace_overview_completed_tasks_text')
            .replace("{user}", userName),
        remaining: getLocaleText(tgUser?.language_code, 'workspace_overview_text')
            .replace("{user}", userName)
            .replace("{completed}", String((total || 0) - (completed || 0)))
            .replace("{total}", String(total)),
    };

    const isReady = total !== undefined && completed !== undefined;

    return (
        <div className={ styles.workspaceOverview }>
            <CalendarBadge />
            <Skeleton width={ 200 } height={ 24 } isReady={ isReady }>
                <Htag tag='xl'>
                    { textMap[textType] }
                </Htag>
            </Skeleton>
        </div>
    );
}