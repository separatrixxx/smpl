import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { PriorityType } from '@/shared/types/priority';


export interface PriorityBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    priority: PriorityType,
}
