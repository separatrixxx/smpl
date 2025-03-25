import { ModalProps } from './Modal.props';
import styles from './Modal.module.scss';
import { ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import { ModalHeader } from '../ModalHeader/ModalHeader';
import { useModal } from '../../hooks/useModal';


export const Modal = ({ title, isOpen, onClose, children }: ModalProps): ReactElement => {
    const { sheetRef, dragY, isDragging, handleBackdropClick, handlePointerDown,
        handlePointerMove, handlePointerUp } = useModal(isOpen, onClose);

    if (!isOpen) return <></>;

    return createPortal(
        <div className={styles.backdrop} role='dialog' aria-modal='true' aria-label={title}
            onClick={handleBackdropClick}>
            <FocusTrap>
                <div ref={sheetRef} className={styles.modal}
                    style={{
                        transform: `translateY(${dragY}px)`,
                        transition: isDragging ? 'none' : 'transform 0.3s ease',
                    }} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}>
                    <ModalHeader title={title} onClose={onClose} />
                    {children}
                </div>
            </FocusTrap>
        </div>,
        document.body
    );
};
