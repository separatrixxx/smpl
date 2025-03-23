import { TaskListItemProps } from './TasksList.props';
import { ReactElement } from "react";
import { TaskItem } from '@/widgets/task-item';
import { withPad } from '@/shared/ui/Pad/hocs/withPad';
import { withBurnPad } from '@/shared/ui/Pad/hocs/withBurnPad';
import { isBurningTask } from '../../utils/isBurningTask';


const TaskItemwWithPad = withPad(TaskItem);
const TaskItemwWithBurnPad = withBurnPad(TaskItem);

const getTaskItemComponent = (date: string) => {
    return isBurningTask(date) ? TaskItemwWithBurnPad : TaskItemwWithPad;
};

export const TaskListItem = ({ task }: TaskListItemProps): ReactElement => {
    const TaskItemComponent = getTaskItemComponent(task.date);

    return (
        <TaskItemComponent title={task.title} isStarred={task.is_starred}
            priority={task.priority} date={task.date} type={task.type} />
    );
};
