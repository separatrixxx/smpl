import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ProjectInterface } from '@/entities/projects/interfaces/projects.interface';


export interface ProjectsListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    projectsList: ProjectInterface[],
    isProjectsListLoading: boolean,
}
