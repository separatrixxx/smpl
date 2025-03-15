import { HtagProps } from './Htag.props';
import styles from './Htag.module.scss';
import { ReactNode } from 'react';
import cn from 'classnames';


export const Htag = ({ tag, children, className, onClick }: HtagProps): ReactNode => {
	switch (tag) {
		case 'm':
			return <h2 className={cn(className, styles.m)} onClick={onClick}>{children}</h2>;
		default:
			return <></>;
	}
};