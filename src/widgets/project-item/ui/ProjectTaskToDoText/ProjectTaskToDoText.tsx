'use client'
import { ProjectTaskToDoTextProps } from './ProjectTaskToDoText.props';
import { ReactElement } from "react";
import { Htag } from '@/shared/ui/Htag/Htag';
import { tasksToDo } from '../../utils/tasksToDoFormat';
import { useUser } from '@/shared/hooks/useUser';


export const ProjectTaskToDoText = ({ tasksCount }: ProjectTaskToDoTextProps): ReactElement => {
    const { tgUser } = useUser();

    return (
        <Htag tag='s'>
            { tasksToDo(tasksCount, tgUser?.language_code || 'en') }
        </Htag>
    );
}