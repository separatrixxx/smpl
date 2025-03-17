import { getData } from "@/shared/api/apiClient";
import { UserWorkspacesInterface } from "../interfaces/user.interface";


export const fetchUserWorkspaces = async (id: number): Promise<UserWorkspacesInterface> => {
    const url = process.env.NEXT_PUBLIC_DOMAIN;

    return getData<UserWorkspacesInterface>(url + `/user/workspaces/${id}`);
};
