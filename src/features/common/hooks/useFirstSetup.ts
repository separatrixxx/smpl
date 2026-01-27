import { useEffect, useState, useRef } from 'react';
import { useSetup } from '@/shared/hooks/useSetup';
import { fetchUserByTelegramId, createUser } from '@/entities/user/api/userApi';
import { getFromStorage, saveToStorage } from '@/shared/utils/storage/storage';
import { USER_ID_KEY } from '@/shared/constants';


export const useFirstSetup = () => {
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const isSettingUp = useRef(false);
    const { tgUser } = useSetup();

    console.log('[useFirstSetup] tgUser:', tgUser);
    console.log('[useFirstSetup] isInitialized:', isInitialized, 'isSetupComplete:', isSetupComplete);

    useEffect(() => {
        // TODO: Убрать после первого успешного запуска
        // Принудительная очистка устаревших данных
        const forceReset = getFromStorage('force_reset_done');
        if (!forceReset) {
            console.log('[useFirstSetup] Force reset localStorage');
            localStorage.removeItem(USER_ID_KEY);
            localStorage.removeItem('currentWorkspace');
            saveToStorage('force_reset_done', 'true');
        }

        const storedUserId = getFromStorage(USER_ID_KEY);
        console.log('[useFirstSetup] storedUserId from localStorage:', storedUserId);
        if (storedUserId) {
            setIsSetupComplete(true);
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isSetupComplete || !isInitialized || !tgUser || isSettingUp.current) {
            return;
        }

        const setupUser = async () => {
            isSettingUp.current = true;
            console.log('[useFirstSetup] Starting setup for telegramId:', tgUser.id);

            try {
                // Пробуем получить пользователя
                const existingUser = await fetchUserByTelegramId(tgUser.id);
                console.log('[useFirstSetup] User found:', existingUser);
                saveToStorage(USER_ID_KEY, String(existingUser.id));
                setIsSetupComplete(true);
            } catch (fetchError) {
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
                    isSettingUp.current = false;
                }
            }
        };

        setupUser();
    }, [tgUser, isSetupComplete, isInitialized]);
};
