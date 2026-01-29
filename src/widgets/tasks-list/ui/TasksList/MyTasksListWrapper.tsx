'use client';
import { MyTasksListWrapperProps } from './TasksList.props';
import { TasksList } from '../..';
import { useSetup } from '@/shared/hooks/useSetup';


export const MyTasksListWrapper = ({ isTasksListLoading }: MyTasksListWrapperProps) => {
    const { tasks } = useSetup();
    
    return <TasksList tasksList={ tasks?.review || [] } isTasksListLoading={ isTasksListLoading } />
};
