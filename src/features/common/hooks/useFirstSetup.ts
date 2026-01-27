import { useEffect, useState } from 'react';
import { useSetup } from '@/shared/hooks/useSetup';
import { fetchUserByTelegramId, createUser } from '@/entities/user/api/userApi';
import { useSWRData } from '@/shared/lib/useSWRData';
import { UserInterface } from '@/entities/user/interfaces/user.interface';
import { getFromStorage, saveToStorage } from '@/shared/utils/storage/storage';
import { USER_ID_KEY } from '@/shared/constants';


export const useFirstSetup = () => {
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const { tgUser } = useSetup();

    console.log('[useFirstSetup] tgUser:', tgUser);
    console.log('[useFirstSetup] isInitialized:', isInitialized, 'isSetupComplete:', isSetupComplete);

    useEffect(() => {
        const storedUserId = getFromStorage(USER_ID_KEY);
        console.log('[useFirstSetup] storedUserId from localStorage:', storedUserId);
        if (storedUserId) {
            setIsSetupComplete(true);
        }
        setIsInitialized(true);
    }, []);

    const telegramId = tgUser?.id;
    const shouldFetch = isInitialized && !isSetupComplete && telegramId !== undefined;
    console.log('[useFirstSetup] telegramId:', telegramId, 'shouldFetch:', shouldFetch);

    const { data: userData, error } = useSWRData<UserInterface>(
        fetchUserByTelegramId,
        'Failed to fetch user',
        shouldFetch ? `/api/user/telegram/${telegramId}` : null,
        telegramId,
    );

    console.log('[useFirstSetup] userData:', userData, 'error:', error);

    useEffect(() => {
        console.log('[useFirstSetup] setupUser effect - isSetupComplete:', isSetupComplete, 'isInitialized:', isInitialized, 'tgUser:', !!tgUser);
        
        if (isSetupComplete || !isInitialized || !tgUser) {
            return;
        }

        const setupUser = async () => {
            console.log('[useFirstSetup] setupUser - error:', error, 'userData:', userData);
            
            if (error && error.response?.status === 404) {
                console.log('[useFirstSetup] User not found, creating...');
                try {
                    const newUser = await createUser({
                        telegram_id: tgUser.id,
                        first_name: tgUser.first_name,
                        last_name: tgUser.last_name || null,
                        username: tgUser.username || null,
                        photo_url: tgUser.photo_url || null,
                    });

                    console.log('[useFirstSetup] Created user:', newUser);
                    saveToStorage(USER_ID_KEY, String(newUser.id));
                    setIsSetupComplete(true);
                } catch (createError) {
                    console.error('[useFirstSetup] Failed to create user:', createError);
                }
            } else if (userData) {
                console.log('[useFirstSetup] User found, saving to storage:', userData.id);
                saveToStorage(USER_ID_KEY, String(userData.id));
                setIsSetupComplete(true);
            }
        };

        setupUser();
    }, [userData, error, tgUser, isSetupComplete, isInitialized]);
};
