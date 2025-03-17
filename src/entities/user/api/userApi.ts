import { getData } from "@/shared/api/apiClient";
import { UserInterface } from "../interfaces/user.interface";


export const fetchUser = async (id: number): Promise<UserInterface> => {
    const url = process.env.NEXT_PUBLIC_DOMAIN;

    return getData<UserInterface>(url + `/user/${id}`);
};
