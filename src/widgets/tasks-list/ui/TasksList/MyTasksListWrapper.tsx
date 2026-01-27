'use client'
import { useSWRData } from '@/shared/lib/useSWRData';
import { TasksList } from '../..';
import { MyTasksDataInterface } from '@/entities/tasks/interfaces/tasks.interface';
import { fetchMyTasksList } from '@/entities/tasks/api/myTasksListApi';
import { useSetup } from '@/shared/hooks/useSetup';


export const MyTasksListWrapper = () => {
    const { tgUser } = useSetup();

    const { data: tasksListData, isLoading: isTasksListLoading } = useSWRData<MyTasksDataInterface>(
        fetchMyTasksList,
        'Failed to fetch tasks list',
        `/api/task?project=my&userId=${tgUser?.id}`,
        tgUser?.id
    );

    return <TasksList tasksList={tasksListData?.review || []} isTasksListLoading={isTasksListLoading} />
};
