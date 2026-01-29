import { getData } from "@/shared/api/apiClient";
import { TasksDataInterface } from "../interfaces/tasks.interface";


export const fetchMyTasksList = async (userId: number): Promise<TasksDataInterface> => {
    return getData<TasksDataInterface>(`/api/task?project=my&userId=${userId}`);
};
