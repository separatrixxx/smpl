import { IconProps } from './Icon.props';
import styles from './Icon.module.scss';
import { icons } from './icons';
import cn from 'classnames';


export const Icon = ({ type, size, color, className, onClick }: IconProps) => {
    const IconComponent = icons[type];

    if (!IconComponent) {
        return null;
    }

    return (
        <IconComponent className={ cn(styles.icon, className, {
            [styles.iconL]: size === 'l',
            [styles.iconM]: size === 'm',
            [styles.iconS]: size === 's',
        }) } style={ color ? { fill: `var(--${color})` } : undefined } onClick={ onClick } />
    );
};
