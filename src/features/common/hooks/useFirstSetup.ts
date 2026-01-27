import { useEffect, useState } from 'react';
import { useSetup } from '@/shared/hooks/useSetup';
import { fetchUserByTelegramId, createUser } from '@/entities/user/api/userApi';
import { useSWRData } from '@/shared/lib/useSWRData';
import { UserInterface } from '@/entities/user/interfaces/user.interface';
import { getFromStorage, saveToStorage } from '@/shared/utils/storage/storage';
import { USER_ID_KEY } from '@/shared/constants';


export const useFirstSetup = () => {
    const [isSetupComplete, setIsSetupComplete] = useState(() => !!getFromStorage(USER_ID_KEY));
    const { tgUser } = useSetup();

    const telegramId = tgUser?.id;
    const shouldFetch = !isSetupComplete && telegramId !== undefined;

    const { data: userData, error } = useSWRData<UserInterface>(
        fetchUserByTelegramId,
        'Failed to fetch user',
        shouldFetch ? `/api/user/telegram/${telegramId}` : null,
        telegramId,
    );

    useEffect(() => {
        if (isSetupComplete || !tgUser) {
            return;
        }

        const setupUser = async () => {
            if (error && error.response?.status === 404) {
                try {
                    const newUser = await createUser({
                        telegram_id: tgUser.id,
                        first_name: tgUser.first_name,
                        last_name: tgUser.last_name || null,
                        username: tgUser.username || null,
                        photo_url: tgUser.photo_url || null,
                    });

                    saveToStorage(USER_ID_KEY, String(newUser.id));
                    setIsSetupComplete(true);
                } catch (createError) {
                    console.error('Failed to create user:', createError);
                }
            } else if (userData) {
                saveToStorage(USER_ID_KEY, String(userData.id));
                setIsSetupComplete(true);
            }
        };

        setupUser();
    }, [userData, error, tgUser, isSetupComplete]);
};
