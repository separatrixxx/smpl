'use client'
import styles from './Avatar.module.scss';
import { ReactElement } from "react";
import Image from 'next/image';
import { useSetup } from '@/shared/hooks/useSetup';
import { avatarPlaceholder } from '@/shared/utils/placeholder/placeholder';
import Link from 'next/link';


export const Avatar = (): ReactElement => {
    const { tgUser } = useSetup();

    const avatarImage = tgUser?.photo_url || avatarPlaceholder;

    return (
        <Link href='/profile' className={styles.avatar} aria-label='profile link'>
            <Image draggable='false'
                loader={() => avatarImage}
                src={avatarImage}
                alt='avatar image'
                width={32}
                height={32}
                unoptimized={true}
            />
        </Link>
    );
}