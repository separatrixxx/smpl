'use client'
import { TasksListWrapperProps } from './TasksList.props';
import { useSetup } from '@/shared/hooks/useSetup';
import { useSWRData } from '@/shared/lib/useSWRData';
import { TasksList } from '../..';
import { fetchTasksListMock } from '@/entities/tasks/mocks/tasksListMock';
import { TasksDataInterface } from '@/entities/tasks/interfaces/tasks.interface';
import { SwitchTaskTypeBlock } from '../SwitchTaskTypeBlock/SwitchTaskTypeBlock';


export const TasksListWrapper = ({ projectId }: TasksListWrapperProps) => {
    const { workspace, taskType } = useSetup();

    const { data: tasksListData, isLoading: isTasksListLoading } = useSWRData<TasksDataInterface>(
        fetchTasksListMock,
        'Failed to fetch tasks list',
        `/tasks?project=${projectId || 'my'}&workspace=${workspace}&userId=${1}`,
        workspace, 1, projectId
    );

    return (
        <>
            <SwitchTaskTypeBlock />
            <TasksList tasksList={(tasksListData && tasksListData[taskType]) || []} isTasksListLoading={isTasksListLoading} />
        </>
    );
};
