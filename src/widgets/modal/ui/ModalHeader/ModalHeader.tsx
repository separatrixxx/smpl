import { ModalHeaderProps } from './ModalHeader.props';
import styles from './ModalHeader.module.scss';
import { ReactElement } from 'react';
import { Htag } from '@/shared/ui/Htag/Htag';
import { Icon } from '@/shared/ui/Icon/Icon';


export const ModalHeader = ({ title, onClose }: ModalHeaderProps): ReactElement => {
    return(
        <div className={styles.modalHeader}>
            <div className={styles.dragHandle} />
            <Htag tag='l' className={styles.modalTitle}>
                {title}
            </Htag>
            <div className={styles.closeModalButton} onClick={onClose}
                role='button' aria-label='close modal button'>
                <Icon type='cross' size='s' color='hint' />
            </div>
        </div>
    );
};
