import { PageWrapperProps } from './PageWrapper.props';
import styles from './PageWrapper.module.scss';
import { ReactElement } from "react";


export const PageWrapper = ({ children }: PageWrapperProps): ReactElement => {
    return (
        <div className={styles.pageWrapper}>
            {children}
        </div>
    );
}