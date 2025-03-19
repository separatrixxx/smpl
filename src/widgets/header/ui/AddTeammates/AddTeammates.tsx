import { AddTeammatesProps } from './AddTeammates.props';
import styles from './AddTeammates.module.scss';
import { ReactElement } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Icon } from '@/shared/ui/Icon/Icon';
import { avatarPlaceholder } from '@/shared/utils/placeholder/placeholder';
import { MyImage } from '@/shared/ui/MyImage/MyImage';


export const AddTeammates = ({ visibleTeammates, isTeammatesLoading }: AddTeammatesProps): ReactElement => {
    return (
        <Skeleton width={92} height={32} isReady={!isTeammatesLoading} isRound={true}>
            <div className={styles.addTeammates}>
                <div className={styles.addTemmateButton}>
                    <Icon type='plus' size='m' color='bg' />
                </div>
                {visibleTeammates.map((vt, i) => (
                    <Skeleton key={i} width={32} height={32} isReady={Boolean(vt.photo_url)} isRound={true}>
                        <MyImage className={styles.teammateImage} src={vt.photo_url || avatarPlaceholder}
                            alt={`${vt.first_name} teammate image`} width={32} height={32}
                            style={{ zIndex: 3 - i }} />
                    </Skeleton>
                ))}
            </div>
        </Skeleton>
    );
}