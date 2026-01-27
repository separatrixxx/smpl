'use client'
import { useSWRData } from '@/shared/lib/useSWRData';
import { TasksList } from '../..';
import { MyTasksDataInterface } from '@/entities/tasks/interfaces/tasks.interface';
import { fetchMyTasksList } from '@/entities/tasks/api/myTasksListApi';
import { getFromStorage } from '@/shared/utils/storage/storage';
import { USER_ID_KEY } from '@/shared/constants';


export const MyTasksListWrapper = () => {
    const userId = getFromStorage(USER_ID_KEY);

    const { data: tasksListData, isLoading: isTasksListLoading } = useSWRData<MyTasksDataInterface>(
        fetchMyTasksList,
        'Failed to fetch tasks list',
        userId ? `/api/task?project=my&userId=${userId}` : null,
        userId ? Number(userId) : undefined
    );

    return <TasksList tasksList={tasksListData?.review || []} isTasksListLoading={isTasksListLoading} />
};
