import { getData, postData } from "@/shared/api/apiClient";
import { UserInterface, CreateUserDataInterface } from "../interfaces/user.interface";


export const fetchUserByTelegramId = async (telegramId: number): Promise<UserInterface> => {
    return getData<UserInterface>(`/api/user/telegram/${telegramId}`);
};

export const createUser = async (data: CreateUserDataInterface): Promise<UserInterface> => {
    return postData<UserInterface>('/api/user', data);
};
