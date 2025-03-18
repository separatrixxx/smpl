import { getData } from "@/shared/api/apiClient";
import { TeammatesInterface } from "../interfaces/teammates.interface";


export const fetchTeammates = async (workspaceId: number, userId: number): Promise<TeammatesInterface> => {
    const url = process.env.NEXT_PUBLIC_DOMAIN;

    return getData<TeammatesInterface>(url + `/teammates/${workspaceId}?userId=${userId}`);
};
