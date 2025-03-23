import { TasksListProps } from './TasksList.props';
import { ReactElement } from "react";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import { TaskListItem } from './TaskListItem';


export const TasksList = ({ tasksList, isTasksListLoading }: TasksListProps): ReactElement => {
    return (
        <Skeleton width='100%' height={112} isReady={!isTasksListLoading}>
            {
                tasksList?.map(tl => (
                    <TaskListItem key={tl.id} task={tl} />
                ))
            }
        </Skeleton>
    );
}
