import {ProjectTitleBlockProps } from './ProjectTitleBlock.props';
import styles from './ProjectTitleBlock.module.scss';
import { ReactElement } from "react";
import { Htag } from '@/shared/ui/Htag/Htag';
import { StarredArchiveBlock } from '@/widgets/starred-archive';


export const ProjectTitleBlock = ({ title, isStarred }: ProjectTitleBlockProps): ReactElement => {
    return (
        <div className={styles.projectTitleBlock}>
            <Htag tag='xl'>
                {title}
            </Htag>
            <StarredArchiveBlock isStarred={isStarred} />
        </div>
    );
}