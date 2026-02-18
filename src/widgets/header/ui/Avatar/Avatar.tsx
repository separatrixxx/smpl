'use client';
import styles from './Avatar.module.scss';
import { ReactElement, useState } from 'react';
import { avatarPlaceholder } from '@/shared/utils/placeholder/placeholder';
import Link from 'next/link';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { MyImage } from '@/shared/ui/MyImage/MyImage';
import { useUser } from '@/shared/hooks/useUser';


export const Avatar = (): ReactElement => {
    const { tgUser } = useUser();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const avatarImage = tgUser?.photo_url || avatarPlaceholder;
    const ariaLabel = 'profile link';

    return (
        <>
            { !isLoaded && (
                <Skeleton width={ 32 } height={ 32 } isReady={ false } isRound={ true }
                    ariaLabel={ ariaLabel } role='link' />
            ) }
            <Link href='/profile' className={ styles.avatar } aria-label={ ariaLabel }
                style={ isLoaded ? undefined : { display: 'none' } }>
                <MyImage src={ avatarImage } alt='avatar image' width={ 32 } height={ 32 }
                    priority onLoad={ () => setIsLoaded(true) } />
            </Link>
        </>
    );
}