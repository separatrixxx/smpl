import { getData, postData } from "@/shared/api/apiClient";
import { UserInterface, UserDataInterface } from "../interfaces/user.interface";


export const fetchUser = async (id: number): Promise<UserInterface> => {
    return getData<UserInterface>(`/api/user/${id}`);
};

export const createUser = async (data: UserDataInterface): Promise<UserInterface> => {
    return postData<UserInterface>('/api/user', data);
};
