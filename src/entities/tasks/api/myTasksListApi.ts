import { getData } from "@/shared/api/apiClient";
import { MyTasksDataInterface } from "../interfaces/tasks.interface";


export const fetchMyTasksList = async (userId: number): Promise<MyTasksDataInterface> => {
    return getData<MyTasksDataInterface>(`/api/task?project=my&userId=${userId}`);
};
