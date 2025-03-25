import { TasksListProps } from './TasksList.props';
import { ReactElement } from "react";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import { TaskItemWrapper } from '@/widgets/task-item/ui/TaskItem/TaskItemWrapper';


export const TasksList = ({ tasksList, isTasksListLoading }: TasksListProps): ReactElement => {
    return (
        <Skeleton width='100%' height={112} isReady={!isTasksListLoading}>
            {
                tasksList?.map(tl => (
                    <TaskItemWrapper key={tl.id} title={tl.title} isStarred={tl.is_starred}
                        priority={tl.priority} date={tl.date} type={tl.type} />
                ))
            }
        </Skeleton>
    );
}
