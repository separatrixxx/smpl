import { Metadata } from "next";
import { PageWrapper } from "@/shared/ui/PageWrapper/PageWrapper";
import { Header } from "@/widgets/header";
import { ProjectPageInterface } from "./interfaces/project-page.interface";
import { fetchProject } from "@/entities/projects/api/projectApi";
import { ProjectInterface } from "@/entities/projects/interfaces/projects.interface";
import { BackButton } from "@/shared/ui/BackButton/BackButton";
import { withPad } from "@/shared/ui/Pad/hocs/withPad";
import { ProjectItem } from "@/widgets/project-item";
import { ButtonsBar } from "./ui/ButtonsBar/ButtonsBar";
import { TasksListWrapper } from "@/widgets/tasks-list";


export async function generateMetadata({ params }: ProjectPageInterface): Promise<Metadata> {
    const resolvedParams = await params;
    const projectId = resolvedParams.projectId;

    try {
        const projectData: ProjectInterface = await fetchProject(+projectId);

        return {
            title: '.smpl - ' + projectData.title,
            description: projectData.description,
        };
    } catch {
        return {
            title: '.smpl',
        };
    }
}

export default async function Project({ params }: ProjectPageInterface) {
    const resolvedParams = await params;
    const projectId = resolvedParams.projectId;

    const projectData: ProjectInterface = await fetchProject(+projectId);

    const ProjectItemWithPad = withPad(ProjectItem);

    return (
        <PageWrapper>
            <BackButton redirectPath='/' />
            <Header currWorkspaceId={projectData.workspace_id} />
            <ProjectItemWithPad title={projectData.title} isStarred={projectData.is_starred}
                tasksCount={projectData.tasks_count} progress={projectData.progress} />
            <ButtonsBar />
            <TasksListWrapper projectId={+projectId} />
        </PageWrapper>
    );
}
