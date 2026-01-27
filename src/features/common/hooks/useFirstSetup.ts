import { useEffect, useState, useRef } from 'react';
import { useSetup } from '@/shared/hooks/useSetup';
import { fetchUserByTelegramId, createUser } from '@/entities/user/api/userApi';
import { saveToStorage } from '@/shared/utils/storage/storage';
import { USER_ID_KEY } from '@/shared/constants';


export const useFirstSetup = () => {
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const isSettingUp = useRef(false);
    const { tgUser } = useSetup();

    useEffect(() => {
        if (isSetupComplete || !tgUser || isSettingUp.current) {
            return;
        }

        const setupUser = async () => {
            isSettingUp.current = true;

            try {
                const existingUser = await fetchUserByTelegramId(tgUser.id);
                saveToStorage(USER_ID_KEY, String(existingUser.id));
                setIsSetupComplete(true);
            } catch {
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
                } catch {
                    isSettingUp.current = false;
                }
            }
        };

        setupUser();
    }, [tgUser, isSetupComplete]);
};
