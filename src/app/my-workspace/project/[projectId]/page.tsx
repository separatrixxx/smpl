import { Metadata } from "next";
import { PageWrapper } from "@/shared/ui/PageWrapper/PageWrapper";
import { Header } from "@/widgets/header";
import { MyProjectPageInterface } from "./interfaces/project-page.interface";
import { fetchProjectMock } from "@/entities/projects/mocks/projectMock";
import { ProjectInterface } from "@/entities/projects/interfaces/projects.interface";
import { BackButton } from "@/shared/ui/BackButton/BackButton";
import { withPad } from "@/shared/ui/Pad/hocs/withPad";
import { ProjectItem } from "@/widgets/project-item";
import { ButtonsBar } from "./ui/ButtonsBar/ButtonsBar";


export async function generateMetadata({ params }: MyProjectPageInterface): Promise<Metadata> {
    const resolvedParams = await params;
    const projectId = resolvedParams.projectId;

    try {
        const projectData: ProjectInterface = await fetchProjectMock(+projectId, 0, 1);

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

export default async function MyProject({ params }: MyProjectPageInterface) {
    const resolvedParams = await params;
    const projectId = resolvedParams.projectId;

    const projectData: ProjectInterface = await fetchProjectMock(+projectId, 0, 1);

    const ProjectItemWithPad = withPad(ProjectItem);

    return (
        <PageWrapper>
            <BackButton redirectPath='/my-workspace' />
            <Header currWorkspaceId={projectData.workspace_id} isAvatar={false} />
            <ProjectItemWithPad title={projectData.title} isStarred={projectData.is_starred}
                tasksCount={projectData.tasks_count} progress={projectData.progress} />
            <ButtonsBar />
        </PageWrapper>
    );
}
