'use client';
import { ReactNode, useEffect } from 'react';
import useSWR from 'swr';
import { useUser } from '@/shared/hooks/useUser';
import { useUserStore } from '@/entities/user/store/userStore';
import { fetchUserByTelegramId } from '@/entities/user/api/userApi';
import { UserInterface } from '@/entities/user/interfaces/user.interface';
import { ErrorPage } from '@/shared/ui/ErrorPage/ErrorPage';
import { getLocaleText } from '@/shared/utils/locale/locale';


export const UserCheckProvider = ({ children }: { children: ReactNode }) => {
    const { tgUser, isUserLoading } = useUser();
    const { setUser } = useUserStore();

    const url = tgUser && !isUserLoading ? `/api/user/telegram/${tgUser.id}` : null;

    const { data: userData, error: userError } = useSWR<UserInterface>(
        url,
        url ? () => fetchUserByTelegramId(+tgUser!.id) : null,
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        }
    );

    useEffect(() => {
        if (userData) {
            setUser(userData);
        }
    }, [userData, setUser]);

    if (!tgUser) {
        return <ErrorPage errorText='The app only works in Telegram' />;
    }

    if (!isUserLoading && userError && !userData) {
        return <ErrorPage errorText={ getLocaleText(tgUser?.language_code, 'user_not_found') } />;
    }

    return <>{ children }</>;
};
