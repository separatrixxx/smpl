import {TaskTitleBlockProps } from './TaskTitleBlock.props';
import styles from './TaskTitleBlock.module.scss';
import { ReactElement } from "react";
import { Htag } from '@/shared/ui/Htag/Htag';
import { StarredArchiveBlock } from '@/widgets/starred-archive';
import { taskDateFormat } from '../../utils/taskDateFormat';


export const TaskTitleBlock = ({ date, isStarred }: TaskTitleBlockProps): ReactElement => {
    return (
        <div className={styles.taskTitleBlock}>
            <Htag tag='m'>
                {taskDateFormat(date)}
            </Htag>
            <StarredArchiveBlock isStarred={isStarred} />
        </div>
    );
}