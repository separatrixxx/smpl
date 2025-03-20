import { fetchWorkspaceMock } from "@/entities/workspace/mocks/workspaceMock";
import { WorkspaceInterface } from "@/entities/workspace/interfaces/workspace.interface";
import { Metadata } from "next";
import { WorkspacePageInterface } from "./interfaces/workspace-page.interface";
import { PageWrapper } from "@/shared/ui/PageWrapper/PageWrapper";
import { Header } from "@/widgets/header";
import { withLogoPad } from "@/shared/ui/Pad/hocs/withLogoPad";
import { WorkspaceOverview } from "@/widgets/workspaceo-overview/ui/WorkspaceOverview/WorkspaceOverview";
import { ButtonsBar } from "./ui/ButtonsBar/ButtonsBar";
import { ProjectsListWrapper } from "@/widgets/projects-list";


export async function generateMetadata({ params }: WorkspacePageInterface): Promise<Metadata> {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    try {
        const workspaceData: WorkspaceInterface = await fetchWorkspaceMock(+id, 1);

        return {
            title: '.smpl - ' + workspaceData.title,
            description: workspaceData.description,
        };
    } catch {
        return {
            title: '.smpl',
        };
    }
}

export default async function Workspace({ params }: WorkspacePageInterface) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const workspaceData: WorkspaceInterface = await fetchWorkspaceMock(+id, 1);
    
    const WorkspaceOverviewWithPad = withLogoPad(WorkspaceOverview);

    const { completed, total } = workspaceData.tasks_info;

    return (
         <PageWrapper>
             <Header currWorkspaceId={workspaceData.id} isAvatar={false} />
             <WorkspaceOverviewWithPad completed={completed} total={total} />
             <ButtonsBar />
             <ProjectsListWrapper />
         </PageWrapper>
    );
}
