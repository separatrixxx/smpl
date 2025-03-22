'use client'
import styles from './ProfileAvatar.module.scss';
import { ReactElement } from "react";
import { useSetup } from '@/shared/hooks/useSetup';
import { avatarPlaceholder } from '@/shared/utils/placeholder/placeholder';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { MyImage } from '@/shared/ui/MyImage/MyImage';


export const ProfileAvatar = (): ReactElement => {
    const { tgUser } = useSetup();

    const avatarImage = tgUser?.photo_url || avatarPlaceholder;
    const isAvatarReady = Boolean(tgUser?.photo_url);

    return (
        <Skeleton width={115} height={100.4} isReady={isAvatarReady}>
            <MyImage className={styles.profileAvatar} src={avatarImage}
                alt='profile avatar image' width={115} height={115} />
        </Skeleton>
    );
}