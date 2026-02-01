'use client';
import { StarredArchiveBlockProps } from './StarredArchiveBlock.props';
import styles from './StarredArchiveBlock.module.scss';
import { ReactElement } from "react";
import { Icon } from '@/shared/ui/Icon/Icon';


export const StarredArchiveBlock = ({ isStarred }: StarredArchiveBlockProps): ReactElement => {
    return (
        <div className={ styles.starredArchiveBlock }>
            <Icon className={ styles.icon }
                type='archive' size='m' color='hint' />
            <Icon className={ styles.icon } type='star' size='m'
                color={ isStarred ? 'primary' : 'hint' } />
        </div>
    );
}