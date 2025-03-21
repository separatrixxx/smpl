import { getData } from "@/shared/api/apiClient";
import { ProjectInterface } from "../interfaces/projects.interface";


export const fetchProject = async (projectId: number, workspaceId: number, userId: number): Promise<ProjectInterface> => {
    const url = process.env.NEXT_PUBLIC_DOMAIN;

    return getData<ProjectInterface>(url + `/projects/${projectId}?workspace=${workspaceId}&userId=${userId}`);
};
