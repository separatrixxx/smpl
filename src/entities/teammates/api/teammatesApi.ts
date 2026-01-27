import { getData } from "@/shared/api/apiClient";
import { TeammatesInterface } from "../interfaces/teammates.interface";


export const fetchTeammates = async (workspaceId: number): Promise<TeammatesInterface> => {
    return getData<TeammatesInterface>(`/api/teammate/${workspaceId}`);
};
