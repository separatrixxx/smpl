'use client';
import { SwitchWorkspaceProps } from './SwitchWorkspace.props';
import styles from './SwitchWorkspace.module.scss';
import { ReactElement, useEffect, useRef, useState } from "react";
import { Htag } from '@/shared/ui/Htag/Htag';
import { getLocaleText } from '@/shared/utils/locale/locale';
import { useSetup } from '@/shared/hooks/useSetup';
import { Icon } from '@/shared/ui/Icon/Icon';
import { useSWRData } from '@/shared/lib/useSWRData';
import { fetchUserWorkspaces } from '@/entities/user/api/userWorkspacesApi';
import { UserWorkspacesInterface } from '@/entities/user/interfaces/user.interface';
import { WorkspaceInterface } from '@/entities/workspace/interfaces/workspace.interface';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { WorkspacesList } from '../WorkspacesList/WorkspacesList';
import cn from 'classnames';
import { fetchMyWorkspace } from '@/entities/workspace/api/workspaceApi';


export const SwitchWorkspace = ({ currWorkspaceId }: SwitchWorkspaceProps): ReactElement => {
    const { tgUser, workspace, setWorkspace } = useSetup();
    const [isListVisible, setIsListVisible] = useState<boolean>(false);
    const switchWorkspaceRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setWorkspace(currWorkspaceId);
    }, [currWorkspaceId, setWorkspace]);

    useEffect(() => {
        const handleClickOutside = (event: PointerEvent) => {
            if (
                switchWorkspaceRef.current &&
                !switchWorkspaceRef.current.contains(event.target as Node)
            ) {
                setIsListVisible(false);
            }
        };

        document.addEventListener("pointerdown", handleClickOutside);
        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsListVisible(false);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const { data: workspacesData, isLoading: isWorkspacesLoading } = useSWRData<UserWorkspacesInterface>(
        fetchUserWorkspaces,
        'Failed to fetch user workspaces',
        `/api/workspace?userId=${tgUser?.id}`,
        tgUser?.id,
    );

    const { data: myWorkspaceData, isLoading: isMyWorkspaceLoading } = useSWRData<WorkspaceInterface>(
        fetchMyWorkspace,
        'Failed to fetch user workspace',
        `/api/workspace/my?userId=${tgUser?.id}`,
        tgUser?.id,
    );

    console.log(workspacesData)
    console.log(myWorkspaceData)

    const isUserWorkspaces = workspacesData && workspacesData.workspaces.length >= 1;
    const currWorkspace = currWorkspaceId === 0
        ? myWorkspaceData
        : workspacesData?.workspaces.find(w => w.id === currWorkspaceId);

    return (
        <div className={styles.switchWorkspace} ref={switchWorkspaceRef}>
            <div className={styles.currentWorkspace} onClick={() => {
                if (isUserWorkspaces && !isWorkspacesLoading && !isMyWorkspaceLoading) {
                    setIsListVisible(!isListVisible);
                }
            }}>
                {
                    isUserWorkspaces && 
                        <Icon
                            type='chevron_down'
                            size='s'
                            className={cn(styles.chevronIcon, {
                                [styles.rotateChevron]: isListVisible,
                            })}
                        />
                }
                <Skeleton width={100} height={20} isReady={!isWorkspacesLoading}>
                    <Htag tag='m'>
                        {currWorkspace?.is_my_workspace
                            ? getLocaleText(tgUser?.language_code, 'my_workspace')
                            : currWorkspace?.title}
                    </Htag>
                </Skeleton>
            </div>
            {
                isUserWorkspaces && isListVisible && !isWorkspacesLoading && 
                    <WorkspacesList currWorkspaceId={workspace}
                        workspaces={workspacesData?.workspaces || []} />
            }
        </div>
    );
};
