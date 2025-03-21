'use client';
import { useSetup } from '@/shared/hooks/useSetup';
import { useSWRData } from '@/shared/lib/useSWRData';
import { fetchProjectsListMock } from '@/entities/projects/mocks/projectsListMock';
import { ProjectInterface } from '@/entities/projects/interfaces/projects.interface';
import { ProjectsList } from './ProjectsList';


export const ProjectsListWrapper = () => {
    const { workspace } = useSetup();

    const { data: projectsListData, isLoading: isProjectsListLoading } = useSWRData<ProjectInterface[]>(
        fetchProjectsListMock,
        'Failed to fetch projects list',
        `/projects?workspace=${workspace}&userId=${1}`,
        workspace, 1
    );

    return <ProjectsList projectsList={projectsListData || []} isProjectsListLoading={isProjectsListLoading} />;
};
