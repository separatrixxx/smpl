'use client'
import { AddTeammatesProps } from './AddTeammates.props';
import styles from './AddTeammates.module.scss';
import { ReactElement, useState } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Modal } from '@/widgets/modal/ui/Modal/Modal';
import { TeammatesList } from '../TeammatesList/TeammatesList';


export const AddTeammates = ({ visibleTeammates, isTeammatesLoading }: AddTeammatesProps): ReactElement => {
    const [isSheetOpen, setSheetOpen] = useState<boolean>(false);

    const handleOpenSheet = () => setSheetOpen(true);
    const handleCloseSheet = () => setSheetOpen(false);

    return (
        <>
            <Skeleton width={92} height={32} isReady={!isTeammatesLoading} isRound={true}>
                <div className={styles.addTeammates} onClick={handleOpenSheet}>
                    <div className={styles.addTemmateButton}>
                        <Icon type='plus' size='m' color='bg' />
                    </div>
                    <TeammatesList className={styles.teammateImage}
                        visibleTeammates={visibleTeammates} />
                </div>
            </Skeleton>
            <Modal title='Добавить тиммейтов' isOpen={isSheetOpen} onClose={handleCloseSheet}>
                <div>
                    <p>Контент для выбора/добавления тиммейтов.</p>
                </div>
            </Modal>
        </>
    );
}