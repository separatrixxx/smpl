import { ProjectItemProps } from './ProjectItem.props';
import styles from './ProjectItem.module.scss';
import { ReactElement } from "react";
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { ProjectTaskToDoText } from '../ProjectTaskToDoText/ProjectTaskToDoText';
import { ProjectTitleBlock } from '../ProjectTitleBlock/ProjectTitleBlock';


export const ProjectItem = ({ title, isStarred, tasksCount, progress }: ProjectItemProps): ReactElement => {   
    return (
        <div className={ styles.projectItem }>
            <ProjectTitleBlock title={ title } isStarred={ isStarred } />
            <ProjectTaskToDoText tasksCount={ tasksCount } />
            <ProgressBar progress={ progress } />
        </div>
    );
}