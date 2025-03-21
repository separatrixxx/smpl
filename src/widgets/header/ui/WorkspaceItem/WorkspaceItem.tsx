'use client'
import { WorkspacesItemProps } from './WorkspaceItem.props';
import styles from './WorkspaceItem.module.scss';
import { ReactElement } from "react";
import { Htag } from '@/shared/ui/Htag/Htag';
import Link from 'next/link';
import { saveToStorage } from '@/shared/utils/storage/storage';


export const WorkspaceItem = ({ workspaceId, title, isMyWorkspace }: WorkspacesItemProps): ReactElement => {
    const link = isMyWorkspace ? '/my-workspace' :  `/workspace/${workspaceId}`;

    const handleLinkClick = () => {
        if (isMyWorkspace) {
            saveToStorage('currentWorkspace', '0');
        } else {
            saveToStorage('currentWorkspace', String(workspaceId));
        }
    }
    
    return (
        <Link href={link} className={styles.workspaceItem} aria-label={`${title} link`}
            onClick={handleLinkClick} prefetch>
            <Htag tag='l'>
                {title}
            </Htag>
        </Link>
    );
}