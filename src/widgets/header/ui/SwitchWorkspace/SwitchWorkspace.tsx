'use client';
import { SwitchWorkspaceProps } from './SwitchWorkspace.props';
import styles from './SwitchWorkspace.module.scss';
import { ReactElement, useEffect, useRef, useState } from "react";
import { Htag } from '@/shared/ui/Htag/Htag';
import { getLocaleText } from '@/shared/utils/locale/locale';
import { useSetup } from '@/shared/hooks/useSetup';
import { Icon } from '@/shared/ui/Icon/Icon';
import { useSWRData } from '@/shared/lib/useSWRData';
import { fetchUserWorkspacesMock } from '@/entities/user/mocks/userWorkspacesMock';
import { UserWorkspacesInterface } from '@/entities/user/interfaces/user.interface';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { WorkspacesList } from '../WorkspacesList/WorkspacesList';
import cn from 'classnames';


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
        fetchUserWorkspacesMock,
        'Failed to fetch user workspaces',
        `/user/workspaces/${1}`,
        1,
    );

    const currWorkspace = workspacesData?.workspaces.find(w => w.id === currWorkspaceId);

    return (
        <div className={styles.switchWorkspace} ref={switchWorkspaceRef}>
            <div className={styles.currentWorkspace} onClick={() => {
                if (!isWorkspacesLoading) {
                    setIsListVisible(!isListVisible);
                }
            }}>
                <Icon
                    type='chevron_down'
                    size='s'
                    className={cn(styles.chevronIcon, {
                        [styles.rotateChevron]: isListVisible,
                    })}
                />
                <Skeleton width={100} height={20} isReady={!isWorkspacesLoading}>
                    <Htag tag='m'>
                        {currWorkspace?.isMyWorkspace
                            ? getLocaleText(tgUser?.language_code, 'my_workspace')
                            : currWorkspace?.title}
                    </Htag>
                </Skeleton>
            </div>
            {
                isListVisible && !isWorkspacesLoading && 
                    <WorkspacesList currWorkspaceId={workspace}
                        workspaces={workspacesData?.workspaces || []} />
            }
        </div>
    );
};
