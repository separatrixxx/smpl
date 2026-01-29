import { ProjectsListProps } from './ProjectsList.props';
import { ReactElement } from "react";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import { ProjectItemWrapper } from "@/widgets/project-item/ui/ProjectItem/ProjectItemWrapper";
import { NoText } from '@/shared/ui/NoText/NoText';


export const ProjectsList = ({ projectsList, isProjectsListLoading }: ProjectsListProps): ReactElement => {
    return (
        <Skeleton width='100%' height={ 112 } isReady={ !isProjectsListLoading }>
            {
                projectsList.length === 0 &&
                   <NoText text='no_projects' />
            }
            {
                projectsList?.map(pl => (
                    <ProjectItemWrapper key={ pl.id } workspaceId={ pl.workspace_id }
                        projectId={ pl.id } title={ pl.title } isStarred={ pl.is_starred }
                        tasksCount={ pl.tasks_count } progress={ pl.progress } />
                ))
            }
        </Skeleton>
    );
}
