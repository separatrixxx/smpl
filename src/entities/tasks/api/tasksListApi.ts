import { getData } from "@/shared/api/apiClient";
import { TasksDataInterface } from "../interfaces/tasks.interface";


export const fetchTasksList = async (workspaceId: number, userId: number, projectId?: number): Promise<TasksDataInterface> => {
    const url = process.env.NEXT_PUBLIC_DOMAIN;

    return getData<TasksDataInterface>(url + `/tasks?project=${projectId}&workspace=${workspaceId}&userId=${userId}`);
};
