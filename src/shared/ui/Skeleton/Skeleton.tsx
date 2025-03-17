import { SkeletonProps } from './Skeleton.props';
import styles from './Skeleton.module.scss';
import { ReactElement } from 'react';
import cn from 'classnames';


export const Skeleton = ({ width, height, isReady, isRound, ariaLabel, children }: SkeletonProps): ReactElement => {
    if (!isReady) {
        return (
            <div className={cn(styles.skeleton, {
                [styles.sizeS]: height <= 20,
                [styles.skeletonRound]: isRound,
            })} style={{ width: width, height: height }}
                aria-label={ariaLabel} />
        );
    } else {
        return (
            <>
                {children}
            </>
        );
    }
};
