import { CheckboxProps } from './Checkbox.props';
import styles from './Checkbox.module.scss';
import { ReactElement } from "react";
import { Icon } from '../Icon/Icon';


export const Checkbox = ({ isChecked, onChange }: CheckboxProps): ReactElement => {
    return (
        <div className={ styles.checkboxWrapper }>
            <input className={ styles.checkbox } type="checkbox" 
                checked={ isChecked } onChange={ onChange } />
            {
                isChecked &&
                    <Icon className={ styles.checkMark } type='check_mark'
                        size='s' color='bg' />
            }
        </div>
    );
};
