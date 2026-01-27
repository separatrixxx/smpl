import { getData } from "@/shared/api/apiClient";
import { ProjectInterface } from "../interfaces/projects.interface";


export const fetchProjectsList = async (workspaceId: number): Promise<ProjectInterface[]> => {
    return getData<ProjectInterface[]>(`/api/project?workspace=${workspaceId}`);
};
