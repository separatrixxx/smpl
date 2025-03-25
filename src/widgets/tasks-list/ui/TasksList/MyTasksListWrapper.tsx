'use client'
import { useSWRData } from '@/shared/lib/useSWRData';
import { TasksList } from '../..';
import { MyTasksDataInterface } from '@/entities/tasks/interfaces/tasks.interface';
import { fetchMyTasksListMock } from '@/entities/tasks/mocks/myTasksListMock';


export const MyTasksListWrapper = () => {
    const { data: tasksListData, isLoading: isTasksListLoading } = useSWRData<MyTasksDataInterface>(
        fetchMyTasksListMock,
        'Failed to fetch tasks list',
        `/tasks?project=my&userId=${1}`,
        1
    );

    return <TasksList tasksList={tasksListData?.review || []} isTasksListLoading={isTasksListLoading} />
};
