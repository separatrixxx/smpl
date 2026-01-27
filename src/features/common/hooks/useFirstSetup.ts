import { useEffect, useState } from 'react';
import { useSetup } from '@/shared/hooks/useSetup';
import { fetchUserByTelegramId, createUser } from '@/entities/user/api/userApi';
import { useSWRData } from '@/shared/lib/useSWRData';
import { UserInterface } from '@/entities/user/interfaces/user.interface';
import { getFromStorage, saveToStorage } from '@/shared/utils/storage/storage';
import { USER_ID_KEY } from '@/shared/constants';


export const useFirstSetup = () => {
    console.log('qwerty 1')
    if (getFromStorage(USER_ID_KEY)) {
        return;
    }

    console.log('qwerty 2')

    const { tgUser } = useSetup();

    console.log(tgUser)

    const telegramId = tgUser?.id;

    const { data: userData, error } = useSWRData<UserInterface>(
        fetchUserByTelegramId,
        'Failed to fetch user',
        `/api/user/telegram/${telegramId}`,
        telegramId,
    );

    useEffect(() => {
        console.log(userData)

        const setupUser = async () => {
            if (error && tgUser) {
                try {
                    const newUser = await createUser({
                        telegram_id: tgUser.id,
                        first_name: tgUser.first_name,
                        last_name: tgUser.last_name || null,
                        username: tgUser.username || null,
                        photo_url: tgUser.photo_url || null,
                    });

                    console.log(newUser)

                    saveToStorage(USER_ID_KEY, String(newUser.id));
                } catch (createError) {
                    console.error('Failed to create user:', createError);
                }
            } else if (userData) {
                saveToStorage(USER_ID_KEY, String(userData.id));
            }
        };

        setupUser();
    }, [userData, error, tgUser]);
};
