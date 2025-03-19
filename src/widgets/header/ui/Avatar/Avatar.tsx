'use client'
import styles from './Avatar.module.scss';
import { ReactElement } from "react";
import { useSetup } from '@/shared/hooks/useSetup';
import { avatarPlaceholder } from '@/shared/utils/placeholder/placeholder';
import Link from 'next/link';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { MyImage } from '@/shared/ui/MyImage/MyImage';


export const Avatar = (): ReactElement => {
    const { tgUser } = useSetup();

    const avatarImage = tgUser?.photo_url || avatarPlaceholder;
    const isAvatarReady = Boolean(tgUser?.photo_url);
    const ariaLabel = 'profile link';

    return (
        <Skeleton width={32} height={32} isReady={isAvatarReady} isRound={true}
            ariaLabel={ariaLabel} role='link'>
            <Link href='/profile' className={styles.avatar} aria-label={ariaLabel}>
                <MyImage className={styles.teammateImage} src={avatarImage}
                    alt='avatar image' width={32} height={32} />
            </Link>
        </Skeleton>
    );
}