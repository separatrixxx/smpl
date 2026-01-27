import { getData } from "@/shared/api/apiClient";
import { WorkspaceInterface } from "../interfaces/workspace.interface";


export const fetchWorkspace = async (workspaceId: number): Promise<WorkspaceInterface> => {
    return getData<WorkspaceInterface>(`/api/workspace/${workspaceId}`);
};
