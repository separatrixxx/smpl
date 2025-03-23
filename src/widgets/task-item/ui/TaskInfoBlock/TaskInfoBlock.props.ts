import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { PriorityType } from '@/shared/types/priority';


export interface TaskInfoBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string,
    priority: PriorityType,
}
