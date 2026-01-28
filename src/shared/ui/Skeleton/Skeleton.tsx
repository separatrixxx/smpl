import { SkeletonProps } from './Skeleton.props';
import styles from './Skeleton.module.scss';
import { ReactElement } from 'react';
import cn from 'classnames';


export const Skeleton = ({ width, height, isReady, isRound, ariaLabel, role, children }: SkeletonProps): ReactElement => {
    if (!isReady) {
        const attributes: { [key: string]: string } = {};

        if (ariaLabel !== undefined) {
            attributes['aria-label'] = ariaLabel;
        }

        if (role !== undefined) {
            attributes['role'] = role;
        }

        return (
            <div className={ cn(styles.skeleton, {
                [styles.sizeS]: +height <= 20,
                [styles.skeletonRound]: isRound,
            }) } style={ { width: width, height: height } }
                { ...attributes } />
        );
    } else if (children) {
        return (
            <>
                { children }
            </>
        );
    } else {
        return <></>;
    }
};
