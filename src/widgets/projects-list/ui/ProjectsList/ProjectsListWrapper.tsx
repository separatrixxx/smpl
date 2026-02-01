'use client';
import { useSetup } from '@/shared/hooks/useSetup';
import { useSWRData } from '@/shared/lib/useSWRData';
import { fetchProjectsList } from '@/entities/projects/api/projectsListApi';
import { ProjectInterface } from '@/entities/projects/interfaces/projects.interface';
import { ProjectsList } from './ProjectsList';


export const ProjectsListWrapper = () => {
    const { workspace } = useSetup();

    const { data: projectsListData, isLoading: isProjectsListLoading } = useSWRData<ProjectInterface[]>(
        fetchProjectsList,
        'Failed to fetch projects list',
        workspace ? `/api/project?workspace=${workspace}` : null,
        workspace
    );

    const isLoading = !workspace || isProjectsListLoading;

    return <ProjectsList projectsList={ projectsListData || [] } isProjectsListLoading={ isLoading } />;
};
