'use client'
import { useSWRData } from '@/shared/lib/useSWRData';
import { TasksList } from '../..';
import { MyTasksDataInterface } from '@/entities/tasks/interfaces/tasks.interface';
import { fetchMyTasksList } from '@/entities/tasks/api/myTasksListApi';


export const MyTasksListWrapper = () => {
    const { data: tasksListData, isLoading: isTasksListLoading } = useSWRData<MyTasksDataInterface>(
        fetchMyTasksList,
        'Failed to fetch tasks list',
        `/api/task?project=my&userId=${1}`,
        1
    );

    return <TasksList tasksList={tasksListData?.review || []} isTasksListLoading={isTasksListLoading} />
};
