import { ButtonIconProps } from './ButtonIcon.props';
import styles from './ButtonIcon.module.scss';
import { ReactElement } from "react";
import { Pad } from '@/shared/ui/Pad/Pad';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Htag } from '@/shared/ui/Htag/Htag';


export const ButtonIcon = ({ type, text, onClick }: ButtonIconProps): ReactElement => {
    return (
        <Pad isSmall={ true } className={ styles.buttonIconPad } onClick={ onClick }>
            <div className={ styles.buttonIcon }>
                <Icon type={ type } size='l' color='primary' />
                <Htag tag='s'>
                    { text }
                </Htag>
            </div>
        </Pad>
    );
};
