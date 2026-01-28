'use client';
import { WorkspacesItemProps } from './WorkspaceItem.props';
import styles from './WorkspaceItem.module.scss';
import { ReactElement } from "react";
import { Htag } from '@/shared/ui/Htag/Htag';
import Link from 'next/link';
import { saveToStorage } from '@/shared/utils/storage/storage';
import { WORKSPACE_KEY } from '@/shared/constants';


export const WorkspaceItem = ({ workspaceId, title, isMyWorkspace }: WorkspacesItemProps): ReactElement => {
    const link = isMyWorkspace ? '/my-workspace' :  `/workspace/${workspaceId}`;

    const handleLinkClick = () => {
        saveToStorage(WORKSPACE_KEY, isMyWorkspace ? '0' : String(workspaceId));
    }
    
    return (
        <Link href={ link } className={ styles.workspaceItem } aria-label={ `${title} link` }
            onClick={ handleLinkClick } prefetch>
            <Htag tag='l'>
                { title }
            </Htag>
        </Link>
    );
}