'use client';
import styles from './ProfileAvatar.module.scss';
import { ReactElement, useState } from "react";
import { avatarPlaceholder } from '@/shared/utils/placeholder/placeholder';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { MyImage } from '@/shared/ui/MyImage/MyImage';
import { useUser } from '@/shared/hooks/useUser';



export const ProfileAvatar = (): ReactElement => {
    const { tgUser } = useUser();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const avatarImage = tgUser?.photo_url || avatarPlaceholder;

    return (
        <>
            { !isLoaded && <Skeleton width={ 115 } height={ 100.4 } isReady={ false } /> }
            <MyImage className={ styles.profileAvatar } src={ avatarImage }
                alt='profile avatar image' width={ 115 } height={ 115 } priority
                onLoad={ () => setIsLoaded(true) }
                style={ isLoaded ? undefined : { display: 'none' } } />
        </>
    );
}