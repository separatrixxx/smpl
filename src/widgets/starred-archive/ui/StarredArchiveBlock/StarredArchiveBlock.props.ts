import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface StarredArchiveBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isStarred: boolean,
}
