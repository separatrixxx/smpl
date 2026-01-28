import { useTelegram } from "@/app/providers/TelegramProvider";
import { USER_ID_MOCK, USER_PHOTO_MOCK, USERNAME_MOCK } from "../constants";


export const useUser = () => {
    const { tgUser } = useTelegram();

    const mockUser = {
        id: USER_ID_MOCK,
        photo_url: USER_PHOTO_MOCK,
        username: USERNAME_MOCK,
        language_code: 'ru',
        first_name: null,
        last_name: null,
    };
    
    if (!tgUser) {
        return {
            tgUser: mockUser,
        };
    }

    return {
        tgUser,
    };
};
