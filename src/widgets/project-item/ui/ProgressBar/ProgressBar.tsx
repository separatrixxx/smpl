import { ProgressBarProps } from './ProgressBar.props';
import styles from './ProgressBar.module.scss';
import { ReactElement } from "react";
import { Htag } from '@/shared/ui/Htag/Htag';


export const ProgressBar = ({ progress }: ProgressBarProps): ReactElement => {
    return (
        <div className={styles.progressBarWrapper}>
            <Htag tag='s'>
                {progress + '%'}
            </Htag>
            <div className={styles.progressBar}>
                <div style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
}