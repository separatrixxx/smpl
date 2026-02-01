import { useTelegram } from "@/app/providers/TelegramProvider";
import { USER_ID_MOCK, USER_PHOTO_MOCK, USERNAME_MOCK } from "../constants";


const mockUser = {
    id: USER_ID_MOCK,
    photo_url: USER_PHOTO_MOCK,
    username: USERNAME_MOCK,
    language_code: 'ru',
    first_name: null,
    last_name: null,
};

export const useUser = () => {
    const { webApp, tgUser } = useTelegram();

    const isUserLoading = webApp === undefined;
    const user = tgUser || mockUser;

    return {
        tgUser: user,
        isUserLoading,
    };
};
