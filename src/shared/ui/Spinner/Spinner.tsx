import { SpinnerProps } from './Spinner.props';
import styles from './Spinner.module.scss';
import { ReactElement } from 'react';
import { Pad } from '../Pad/Pad';


export const Spinner = ({ size }: SpinnerProps): ReactElement => {
    return (
        <Pad isSmall={ true } className={ styles.spinnerWrapper }>
            <span className={ styles.spinner } style={ { width: size, height: size } } />
        </Pad>
    );
}