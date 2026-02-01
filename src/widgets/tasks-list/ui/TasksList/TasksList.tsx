import { TasksListProps } from './TasksList.props';
import { ReactElement, useMemo } from "react";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import { TaskItemWrapper } from '@/widgets/task-item/ui/TaskItem/TaskItemWrapper';


export const TasksList = ({ tasksList, isTasksListLoading }: TasksListProps): ReactElement => {
    const sortedTasks = useMemo(() => {
        if (!tasksList) {return [];}

        return [...tasksList].sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            if (dateA !== dateB) {
                return dateA - dateB;
            }

            return (b.id ?? 0) - (a.id ?? 0);
        });
    }, [tasksList]);

    return (
        <Skeleton width='100%' height={ 112 } isReady={ !isTasksListLoading }>
            {
                sortedTasks.map(tl => (
                    <TaskItemWrapper key={ tl.id } taskId={ tl.id } title={ tl.title } isStarred={ tl.is_starred }
                        priority={ tl.priority } date={ tl.date } type={ tl.type } />
                ))
            }
        </Skeleton>
    );
}
