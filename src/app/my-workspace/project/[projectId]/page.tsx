import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/shared/ui/PageWrapper/PageWrapper";
import { Header } from "@/widgets/header";
import { MyProjectPageInterface } from "./interfaces/project-page.interface";
import { BackButton } from "@/shared/ui/BackButton/BackButton";
import { withPad } from "@/shared/ui/Pad/hocs/withPad";
import { ProjectItem } from "@/widgets/project-item";
import { ButtonsBar } from "./ui/ButtonsBar/ButtonsBar";
import { TasksListWrapper } from "@/widgets/tasks-list";
import { db } from "@/shared/utils/prisma/prismaClient";


async function getProject(projectId: number) {
    const project = await db.project.findUnique(projectId);

    if (!project) {
        return null;
    }

    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter((t) => t.status === 'done').length;

    return {
        id: project.id,
        workspace_id: project.workspace_id,
        title: project.title,
        description: project.description,
        is_starred: project.is_starred,
        tasks_count: totalTasks,
        progress: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    };
}

export async function generateMetadata({ params }: MyProjectPageInterface): Promise<Metadata> {
    const resolvedParams = await params;
    const projectId = resolvedParams.projectId;

    const projectData = await getProject(+projectId);

    if (!projectData) {
        return { title: '.smpl' };
    }

    return {
        title: '.smpl - ' + projectData.title,
        description: projectData.description,
    };
}

export default async function MyProject({ params }: MyProjectPageInterface) {
    const resolvedParams = await params;
    const projectId = resolvedParams.projectId;

    const projectData = await getProject(+projectId);

    if (!projectData) {
        notFound();
    }

    const ProjectItemWithPad = withPad(ProjectItem);

    return (
        <PageWrapper>
            <BackButton redirectPath='/my-workspace' />
            <Header currWorkspaceId={projectData.workspace_id} isAvatar={true} />
            <ProjectItemWithPad title={projectData.title} isStarred={projectData.is_starred}
                tasksCount={projectData.tasks_count} progress={projectData.progress} />
            <ButtonsBar />
            <TasksListWrapper projectId={+projectId} />
        </PageWrapper>
    );
}
