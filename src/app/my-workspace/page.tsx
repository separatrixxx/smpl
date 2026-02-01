'use client';
import { useEffect, useState } from 'react';
import { withLogoPad } from "@/shared/ui/Pad/hocs/withLogoPad";
import { PageWrapper } from "@/shared/ui/PageWrapper/PageWrapper";
import { Header } from "@/widgets/header";
import { WorkspaceOverview } from "@/widgets/workspaceo-overview/ui/WorkspaceOverview/WorkspaceOverview";
import { ButtonsBar } from "./ui/ButtonsBar/ButtonsBar";
import { ProjectsListWrapper } from "@/widgets/projects-list";
import { MyTasksListWrapper } from "@/widgets/tasks-list/ui/TasksList/MyTasksListWrapper";
import { useSWRData } from "@/shared/lib/useSWRData";
import { fetchMyWorkspace } from "@/entities/workspace/api/workspaceApi";
import { WorkspaceInterface } from "@/entities/workspace/interfaces/workspace.interface";
import { useSetup } from "@/shared/hooks/useSetup";
import { useUser } from '@/shared/hooks/useUser';
import { AddTask } from '@/widgets/add-task';
import { fetchMyTasksList } from '@/entities/tasks/api/myTasksListApi';
import { TasksDataInterface } from '@/entities/tasks/interfaces/tasks.interface';
import { getTodayTasksStats } from '@/shared/utils/common';


export default function MyWorkspace() {
    const { setWorkspace, setTasks, tasks } = useSetup();
    const { tgUser, isUserLoading } = useUser();

    const { data: workspaceData } = useSWRData<WorkspaceInterface>(
        fetchMyWorkspace,
        'Failed to fetch my workspace',
        !isUserLoading ? `/api/workspace/my?userId=${tgUser?.id}` : null,
        tgUser?.id
    );

    const { data: tasksListData, isLoading: isTasksListLoading } = useSWRData<TasksDataInterface>(
        fetchMyTasksList,
        'Failed to fetch tasks list',
        !isUserLoading ? `/api/task?project=my&userId=${tgUser?.id}` : null,
        tgUser?.id
    );

    useEffect(() => {
        if (workspaceData?.id) {
            setWorkspace(workspaceData.id);
        }

        if (tasksListData) {
            setTasks(tasksListData);
        }
    }, [workspaceData, setWorkspace, tasksListData, setTasks]);

    const WorkspaceOverviewWithPad = withLogoPad(WorkspaceOverview);

    const { completed, total } = getTodayTasksStats(tasks);

    const [isSheetOpen, setSheetOpen] = useState<boolean>(false);

    return (
        <PageWrapper>
            <Header currWorkspaceId={ workspaceData?.id ?? 0 } isAvatar={ true } />
            <WorkspaceOverviewWithPad completed={ completed } total={ total } />
            <ButtonsBar setSheetOpen={ setSheetOpen } />
            <ProjectsListWrapper />
            <MyTasksListWrapper isTasksListLoading={ isTasksListLoading || isUserLoading } />
            <AddTask isSheetOpen={ isSheetOpen } setSheetOpen={ setSheetOpen } />
        </PageWrapper>
    );
}
