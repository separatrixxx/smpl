import { ProjectItemWrapperProps } from './ProjectItem.props';
import styles from './ProjectItem.module.scss';
import { ReactElement } from 'react';
import Link from 'next/link';
import { ProjectItem } from '@/widgets/project-item';
import { withPad } from '@/shared/ui/Pad/hocs/withPad';


export const ProjectItemWrapper = ({ workspaceId, projectId, ...rest }: ProjectItemWrapperProps): ReactElement => {
    const ProjectItemWithPad = withPad(ProjectItem);

    return (
        <Link href={`/workspace/${workspaceId}/project/${projectId}`} className={styles.projectItemWrapper}>
            <ProjectItemWithPad {...rest} />
        </Link>
    );
};