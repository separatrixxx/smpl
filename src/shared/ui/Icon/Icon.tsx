import { IconProps } from './Icon.props';
import styles from './Icon.module.scss';
import { ReactNode } from 'react';
import LogoIcon from './icons/logo.svg';
import ChevronDownIcon from './icons/chevron_down.svg';
import ChevronUpIcon from './icons/chevron_up.svg';
import ChevronLeftIcon from './icons/chevron_left.svg';
import ChevronRightIcon from './icons/chevron_right.svg';
import CalendarIcon from './icons/calendar.svg';
import cn from 'classnames';


export const Icon = ({ type, size, className, onClick }: IconProps): ReactNode => {
    let IconComponent = null;

    switch (type) {
        case 'logo':
            IconComponent = LogoIcon;
            break;
        case 'chevron_down':
            IconComponent = ChevronDownIcon;
            break;
        case 'chevron_up':
            IconComponent = ChevronUpIcon;
            break;
        case 'chevron_left':
            IconComponent = ChevronLeftIcon;
            break;
        case 'chevron_right':
            IconComponent = ChevronRightIcon;
            break;
        case 'calendar':
            IconComponent = CalendarIcon;
            break;
        default:
            return null;
    }

    return (
        <IconComponent className={cn(styles.icon, className, {
            [styles.isonL]: size === 'l',
            [styles.isonM]: size === 'm',
            [styles.isonS]: size === 's',
        })} onClick={onClick} />
    );
};
