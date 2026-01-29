import { TaskItemProps } from './TaskItem.props';
import styles from './TaskItem.module.scss';
import { ReactElement } from "react";
import { TaskItem } from './TaskItem';
import { withPad } from '@/shared/ui/Pad/hocs/withPad';
import { withBurnPad } from '@/shared/ui/Pad/hocs/withBurnPad';
import { isBurningTask } from '../../utils/isBurningTask';
import { useTaskDrag } from '../../hooks/useTaskDrag';
import { ClientHtag } from '@/shared/ui/Htag/ClientHtag';
import cn from 'classnames';


const TaskItemwWithPad = withPad(TaskItem);
const TaskItemwWithBurnPad = withBurnPad(TaskItem);

const getTaskItemComponent = (date: string) => {
    return isBurningTask(date) ? TaskItemwWithBurnPad : TaskItemwWithPad;
};

export const TaskItemWrapper = ({ ...rest }: TaskItemProps): ReactElement => {
    const { position, isDragging, isThresholdReached, dragHandlers, nextType } = useTaskDrag(rest.taskId, rest.type);

    const TaskItemComponent = getTaskItemComponent(rest.date);

    return (
        <div className={ cn(styles.taskItemWrapper, {
            [styles.primaryTaskItemWrapper]: isThresholdReached,
        }) }>
            <ClientHtag tag='s' text={ nextType || '' } />
            <div className={ cn(styles.dragWrapper, {
                [styles.dragCursor]: nextType,
            }) } { ...dragHandlers } style={ {
                transform: `translateX(${position}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease',
            } }>
                <TaskItemComponent className={ styles.taskItemPad } { ...rest } />
            </div>
        </div>
    );
}
