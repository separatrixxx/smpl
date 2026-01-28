'use client';
import { WorkspacesListProps } from './WorkspacesList.props';
import styles from './WorkspacesList.module.scss';
import { ReactElement } from "react";
import { WorkspaceItem } from '../WorkspaceItem/WorkspaceItem';
import { getWorkspaceTitle } from '@/shared/utils/common';
import { useUser } from '@/shared/hooks/useUser';


export const WorkspacesList = ({ currWorkspaceId, workspaces }: WorkspacesListProps): ReactElement => {
    const { tgUser } = useUser();
     
    return (
        <div className={ styles.workspacesList }>
            { workspaces
                .filter(w => w.id !== currWorkspaceId)
                .sort((a) => {
                    return a.is_my_workspace ? -1 : 1;
                })
                .map(w => (
                    <WorkspaceItem key={ w.id } workspaceId={ w.id }
                        title={ getWorkspaceTitle(tgUser.language_code, w.title, w.is_my_workspace) }
                        isMyWorkspace={ w.is_my_workspace } />
                )) }
        </div>
    );
}