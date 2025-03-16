import { HtagProps } from './Htag.props';
import styles from './Htag.module.scss';
import { ReactNode } from 'react';
import cn from 'classnames';


export const Htag = ({ tag, children, className, onClick }: HtagProps): ReactNode => {
	switch (tag) {
		case 'l':
			return <h2 className={cn(className, styles.l)} onClick={onClick}>{children}</h2>;
		case 'm':
			return <h2 className={cn(className, styles.m)} onClick={onClick}>{children}</h2>;
		case 's':
			return <h3 className={cn(className, styles.s)} onClick={onClick}>{children}</h3>;
		default:
			return <></>;
	}
};