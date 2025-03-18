import { UserInterface } from '@/entities/user/interfaces/user.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface AddTeammatesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    visibleTeammates: UserInterface[],
    isTeammatesLoading: boolean,
}