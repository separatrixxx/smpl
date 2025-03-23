import { TaskListItemProps } from './TasksList.props';
import { ReactElement } from "react";
import { TaskItem } from '@/widgets/task-item';
import { withPad } from '@/shared/ui/Pad/hocs/withPad';
import { withBurnPad } from '@/shared/ui/Pad/hocs/withBurnPad';


const TaskItemwWithPad = withPad(TaskItem);
const TaskItemwWithBurnPad = withBurnPad(TaskItem);

const getTaskItemComponent = (priority: number) => {
    return priority === 4 ? TaskItemwWithBurnPad : TaskItemwWithPad;
};

export const TaskListItem = ({ task }: TaskListItemProps): ReactElement => {
    const TaskItemComponent = getTaskItemComponent(task.priority);

    return (
        <TaskItemComponent
            key={task.id}
            title={task.title}
            isStarred={task.is_starred}
            priority={task.priority}
            date={task.date}
            type={task.type}
        />
    );
};
