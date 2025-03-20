'use client'
import { ProjectTaskToDoTextProps } from './ProjectTaskToDoText.props';
import { ReactElement } from "react";
import { Htag } from '@/shared/ui/Htag/Htag';
import { useSetup } from '@/shared/hooks/useSetup';
import { tasksToDo } from '../../utils/tasksToDoFormat';


export const ProjectTaskToDoText = ({ tasksCount }: ProjectTaskToDoTextProps): ReactElement => {
    const { tgUser } = useSetup();

    return (
        <Htag tag='s'>
            {tasksToDo(tasksCount, tgUser?.language_code || 'en')}
        </Htag>
    );
}