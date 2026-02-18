'use client';
import { ErrorPageProps } from './ErrorPage.props';
import styles from './ErrorPage.module.scss';


export const ErrorPage = ({ errorText }: ErrorPageProps) => {
    return (
        <div className={ styles.errorPage }>
            { errorText }
        </div>
    );
};
