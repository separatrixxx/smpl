import { getData, postData } from "@/shared/api/apiClient";
import { CreateTaskInterface, TaskInterface, TasksDataInterface } from "../interfaces/tasks.interface";


export const fetchTasksList = async (workspaceId: number, projectId?: number): Promise<TasksDataInterface> => {
    const projectParam = projectId !== undefined ? `&project=${projectId}` : '';

    return getData<TasksDataInterface>(`/api/task?workspace=${workspaceId}${projectParam}`);
};

export const createTask = async (data: CreateTaskInterface): Promise<TaskInterface> => {
    return postData<TaskInterface>(`/api/task`, data);
};
