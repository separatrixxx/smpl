import { getData } from "@/shared/api/apiClient";
import { WorkspaceInterface } from "../interfaces/workspace.interface";


export const fetchWorkspace = async (id: number): Promise<WorkspaceInterface> => {
    const url = process.env.NEXT_PUBLIC_DOMAIN;

    return getData<WorkspaceInterface>(url + `/workspace/${id}`);
};
