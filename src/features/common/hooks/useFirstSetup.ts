import { useEffect } from 'react';
import { useSetup } from '@/shared/hooks/useSetup';
import { fetchUser, createUser } from '@/entities/user/api/userApi';
import { useSWRData } from '@/shared/lib/useSWRData';
import { UserInterface } from '@/entities/user/interfaces/user.interface';
import { getFromStorage, saveToStorage } from '@/shared/utils/storage/storage';
import { USER_ID_KEY } from '@/shared/constants';


export const useFirstSetup = () => {
    if (getFromStorage(USER_ID_KEY)) {
        return;
    }
    
    const { tgUser } = useSetup();
    
    const id = tgUser?.id;

    const { data: userData, error } = useSWRData<UserInterface>(
        fetchUser,
        'Failed to fetch user',
        `/api/user/${id}`,
        id,
    );

    useEffect(() => {
        const setupUser = async () => {
            if (error && tgUser) {
                const userData = await createUser({
                    first_name: tgUser.first_name,
                    last_name: tgUser.last_name || null,
                    username: tgUser.username || null,
                    photo_url: tgUser.photo_url || null,
                });

                saveToStorage(USER_ID_KEY, String(userData.id));
            } else if (userData) {
                saveToStorage(USER_ID_KEY, String(userData.id));
            }
        };

        setupUser();
    }, [userData, error, tgUser]);
};
