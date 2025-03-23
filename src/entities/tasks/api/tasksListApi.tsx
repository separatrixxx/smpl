import { getData } from "@/shared/api/apiClient";
import { TaskInterface } from "../interfaces/tasks.interface";


export const fetchTasksList = async (workspaceId: number, userId: number, projectId?: number): Promise<TaskInterface[]> => {
    const url = process.env.NEXT_PUBLIC_DOMAIN;

    return getData<TaskInterface[]>(url + `/tasks?project=${projectId || 'my'}&workspace=${workspaceId}&userId=${userId}`);
};
