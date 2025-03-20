import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { UserInterface } from '@/entities/user/interfaces/user.interface';


export interface AddTeammatesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    visibleTeammates: UserInterface[],
    isTeammatesLoading: boolean,
}