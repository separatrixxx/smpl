import { getData } from "@/shared/api/apiClient";
import { UserWorkspacesInterface } from "../interfaces/user.interface";


export const fetchUserWorkspaces = async (userId: number): Promise<UserWorkspacesInterface> => {
    return getData<UserWorkspacesInterface>(`/api/workspace?userId=${userId}`);
};
