import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { UserInterface } from '@/entities/user/interfaces/user.interface';


export interface TeammatesListProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    visibleTeammates: UserInterface[],
}
