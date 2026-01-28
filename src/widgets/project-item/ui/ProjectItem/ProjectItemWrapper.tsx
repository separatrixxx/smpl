import { ProjectItemWrapperProps } from './ProjectItem.props';
import styles from './ProjectItem.module.scss';
import { ReactElement } from 'react';
import Link from 'next/link';
import { ProjectItem } from '@/widgets/project-item';
import { withPad } from '@/shared/ui/Pad/hocs/withPad';


export const ProjectItemWrapper = ({ workspaceId, projectId, ...rest }: ProjectItemWrapperProps): ReactElement => {
    const ProjectItemWithPad = withPad(ProjectItem);

    const projectLink = workspaceId
        ? `/workspace/${workspaceId}/project/${projectId}`
        : `/my-workspace/project/${projectId}`

    return (
        <Link href={ projectLink } className={ styles.projectItemWrapper }>
            <ProjectItemWithPad { ...rest } />
        </Link>
    );
};