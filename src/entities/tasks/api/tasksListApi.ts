import { getData } from "@/shared/api/apiClient";
import { TasksDataInterface } from "../interfaces/tasks.interface";


export const fetchTasksList = async (workspaceId: number, projectId?: number): Promise<TasksDataInterface> => {
    const projectParam = projectId !== undefined ? `&project=${projectId}` : '';

    return getData<TasksDataInterface>(`/api/task?workspace=${workspaceId}${projectParam}`);
};
