import {ProjectTitleBlockProps } from './ProjectTitleBlock.props';
import styles from './ProjectTitleBlock.module.scss';
import { ReactElement } from "react";
import { Htag } from '@/shared/ui/Htag/Htag';
import { Icon } from '@/shared/ui/Icon/Icon';


export const ProjectTitleBlock = ({ title, isStarred }: ProjectTitleBlockProps): ReactElement => {
    return (
        <div className={styles.projectTitleBlock}>
            <Htag tag='xl'>
                {title}
            </Htag>
            <div>
                <Icon className={styles.icon}
                    type='archive' size='m' color='hint' />
                <Icon className={styles.icon} type='star' size='m'
                    color={isStarred ? 'primary' : 'hint'} />
            </div>
        </div>
    );
}