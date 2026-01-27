import { getData } from "@/shared/api/apiClient";
import { ProjectInterface } from "../interfaces/projects.interface";


export const fetchProject = async (projectId: number): Promise<ProjectInterface> => {
    return getData<ProjectInterface>(`/api/project/${projectId}`);
};
