'use client'
import { IconProps } from './Icon.props';
import styles from './Icon.module.scss';
import { ReactNode, useEffect, useState } from 'react';
import { Skeleton } from '../Skeleton/Skeleton';
import { loggerError } from '@/shared/utils/logger/logger';
import cn from 'classnames';


export const Icon = ({ type, size, color, className, onClick }: IconProps): ReactNode => {
    const [IconComponent, setIconComponent] = useState<React.ComponentType<any> | null>(null);

    useEffect(() => {
        const importIcon = async () => {
            try {
                const icon = await import(`./icons/${type}.svg`);

                setIconComponent(icon.default);
            } catch (err) {
                loggerError(`${err}: Icon with type "${type}" not found!`);
                
                setIconComponent(null);
            }
        };

        importIcon();
    }, [type]);

    if (!IconComponent) {
        return (
            <>
                {
                    type !== 'logo'
                        ? <Skeleton width={20} height={20} isReady={Boolean(IconComponent)}  />
                        : null
                }
            </>
        );
    }

    return (
        <IconComponent className={cn(styles.icon, className, {
            [styles.iconL]: size === 'l',
            [styles.iconM]: size === 'm',
            [styles.iconS]: size === 's',
        })} style={ color && { fill: `var(--${color})` }} onClick={onClick} />

    );
};
