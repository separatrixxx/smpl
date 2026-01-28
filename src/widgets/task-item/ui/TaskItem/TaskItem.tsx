import { TaskItemProps } from './TaskItem.props';
import styles from './TaskItem.module.scss';
import { ReactElement } from "react";
import { TaskTitleBlock } from '../TaskTitleBlock/TaskTitleBlock';
import { TaskInfoBlock } from '../TaskInfoBlock/TaskInfoBlock';


export const TaskItem = ({ title, isStarred, priority, date, type }: TaskItemProps): ReactElement => {
    return (
        <div className={ styles.taskItem }>
            <TaskTitleBlock date={ date } isStarred={ isStarred } />
            <TaskInfoBlock title={ title } priority={ priority } type={ type } />
        </div>
    );
}