'use client';
import { TasksListWrapperProps } from './TasksList.props';
import { useSetup } from '@/shared/hooks/useSetup';
import { useSWRData } from '@/shared/lib/useSWRData';
import { TasksList } from '../..';
import { fetchTasksListMock } from '@/entities/tasks/mocks/tasksListMock';
import { TaskInterface } from '@/entities/tasks/interfaces/tasks.interface';


export const TasksListWrapper = ({ projectId }: TasksListWrapperProps) => {
    const { workspace } = useSetup();

    const { data: tasksListData, isLoading: isTasksListLoading } = useSWRData<TaskInterface[]>(
        fetchTasksListMock,
        'Failed to fetch tasks list',
        `/tasks?project=${projectId || 'my'}&workspace=${workspace}&userId=${1}`,
        workspace, 1, projectId
    );

    return <TasksList tasksList={tasksListData || []} isTasksListLoading={isTasksListLoading} />;
};
