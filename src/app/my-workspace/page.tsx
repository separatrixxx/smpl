'use client';
import { useEffect } from 'react';
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


export default function MyWorkspace() {
    const { tgUser, setWorkspace } = useSetup();

    const { data: workspaceData } = useSWRData<WorkspaceInterface>(
        fetchMyWorkspace,
        'Failed to fetch my workspace',
        `/api/workspace/my?userId=${tgUser?.id}`,
        tgUser?.id
    );

    useEffect(() => {
        if (workspaceData?.id) {
            setWorkspace(workspaceData.id);
        }
    }, [workspaceData, setWorkspace]);

    console.log(workspaceData)

    const WorkspaceOverviewWithPad = withLogoPad(WorkspaceOverview);

    const completed = workspaceData?.tasks_info?.completed ?? 0;
    const total = workspaceData?.tasks_info?.total ?? 0;

    return (
        <PageWrapper>
            <Header currWorkspaceId={workspaceData?.id ?? 0} isAvatar={true} />
            <WorkspaceOverviewWithPad completed={completed} total={total} />
            <ButtonsBar />
            <ProjectsListWrapper />
            <MyTasksListWrapper />
        </PageWrapper>
    );
}
