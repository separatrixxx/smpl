'use client'
import { TasksListWrapperProps } from './TasksList.props';
import { useSetup } from '@/shared/hooks/useSetup';
import { useSWRData } from '@/shared/lib/useSWRData';
import { TasksList } from '../..';
import { fetchTasksList } from '@/entities/tasks/api/tasksListApi';
import { TasksDataInterface } from '@/entities/tasks/interfaces/tasks.interface';
import { SwitchTaskTypeBlock } from '../SwitchTaskTypeBlock/SwitchTaskTypeBlock';


export const TasksListWrapper = ({ projectId }: TasksListWrapperProps) => {
    const { workspace, taskType } = useSetup();

    const { data: tasksListData, isLoading: isTasksListLoading } = useSWRData<TasksDataInterface>(
        fetchTasksList,
        'Failed to fetch tasks list',
        `/api/task?workspace=${workspace}${projectId !== undefined ? `&project=${projectId}` : ''}`,
        workspace, projectId
    );

    return (
        <>
            <SwitchTaskTypeBlock />
            <TasksList tasksList={(tasksListData && tasksListData[taskType]) || []} isTasksListLoading={isTasksListLoading} />
        </>
    );
};
