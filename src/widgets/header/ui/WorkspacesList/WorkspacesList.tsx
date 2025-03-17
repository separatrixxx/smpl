'use client'
import styles from './WorkspacesList.module.scss';
import { ReactElement } from "react";
import { useSetup } from '@/shared/hooks/useSetup';
import { useSWRData } from '@/shared/lib/useSWRData';
import { fetchUserWorkspacesMock } from '@/entities/user/mocks/userWorkspacesMock';
import { UserWorkspacesInterface } from '@/entities/user/interfaces/user.interface';
import { WorkspaceItem } from '../WorkspaceItem/WorkspaceItem';


export const WorkspacesList = (): ReactElement => {
    const { workspace } = useSetup();

    const { data: workspacesData } = useSWRData<UserWorkspacesInterface>(
        fetchUserWorkspacesMock,
        'Failed to fetch user workspaces',
        `/user/workspaces/${1}`,
        1
    );

    return (
        <div className={styles.workspacesList}>
            {workspacesData?.workspaces
                .filter(w => w.id !== workspace)
                .sort((a, b) => {
                    if (a.isMyWorkspace === b.isMyWorkspace) return 0;
                    return a.isMyWorkspace ? 1 : -1;
                })
                .map(w => (
                    <WorkspaceItem key={w.id} workspaceId={w.id} title={w.title}
                        isMyWorkspace={w.isMyWorkspace} />
                ))}
        </div>
    );
}