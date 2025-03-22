import { PageWrapperProps } from './PageWrapper.props';
import styles from './PageWrapper.module.scss';
import { ReactElement } from 'react';
import cn from 'classnames';


export const PageWrapper = ({ isMoreGap, children }: PageWrapperProps): ReactElement => {
    return (
        <main className={cn(styles.pageWrapper, {
            [styles.moreGap]: isMoreGap,
        })}>
            {children}
        </main>
    );
}