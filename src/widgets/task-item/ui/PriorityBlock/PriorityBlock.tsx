import { PriorityBlockProps } from './PriorityBlock.props';
import styles from './PriorityBlock.module.scss';
import { ReactElement } from "react";
import cn from 'classnames';


export const PriorityBlock = ({ priority }: PriorityBlockProps): ReactElement => {
    return (
        <div className={styles.priorityBlock}>
            {[...Array(4)].map((_, i) => (
                <span key={i} className={cn(styles.prioritySpan, {
                    [styles.blackSpan]: i < priority,
                })} />
            ))}
        </div>
    );
}