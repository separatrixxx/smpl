import { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkspacePageInterface } from "./interfaces/workspace-page.interface";
import { PageWrapper } from "@/shared/ui/PageWrapper/PageWrapper";
import { Header } from "@/widgets/header";
import { withLogoPad } from "@/shared/ui/Pad/hocs/withLogoPad";
import { WorkspaceOverview } from "@/widgets/workspaceo-overview/ui/WorkspaceOverview/WorkspaceOverview";
import { ButtonsBar } from "./ui/ButtonsBar/ButtonsBar";
import { ProjectsListWrapper } from "@/widgets/projects-list";
import { db } from "@/shared/utils/prisma/prismaClient";


async function getWorkspace(workspaceId: number) {
    const workspace = await db.workspace.findUnique(workspaceId);

    if (!workspace) {
        return null;
    }

    return {
        id: workspace.id,
        title: workspace.title,
        description: workspace.description,
        is_my_workspace: workspace.is_my_workspace,
        owner: workspace.owner_id,
        teammates: workspace.teammates.map((t) => t.user_id),
        tasks_info: {
            completed: workspace.tasks.filter((t) => t.status === 'done').length,
            total: workspace.tasks.length,
        },
    };
}

export async function generateMetadata({ params }: WorkspacePageInterface): Promise<Metadata> {
    const resolvedParams = await params;
    const workspaceId = resolvedParams.workspaceId;

    const workspaceData = await getWorkspace(+workspaceId);

    if (!workspaceData) {
        return { title: '.smpl' };
    }

    return {
        title: '.smpl - ' + workspaceData.title,
        description: workspaceData.description,
    };
}

export default async function Workspace({ params }: WorkspacePageInterface) {
    const resolvedParams = await params;
    const workspaceId = resolvedParams.workspaceId;

    const workspaceData = await getWorkspace(+workspaceId);

    if (!workspaceData) {
        notFound();
    }

    const WorkspaceOverviewWithPad = withLogoPad(WorkspaceOverview);

    const { completed, total } = workspaceData.tasks_info;

    return (
        <PageWrapper>
            <Header currWorkspaceId={ workspaceData.id } />
            <WorkspaceOverviewWithPad completed={ completed } total={ total } />
            <ButtonsBar />
            <ProjectsListWrapper />
        </PageWrapper>
    );
}
