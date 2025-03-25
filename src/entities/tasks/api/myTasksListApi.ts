import { getData } from "@/shared/api/apiClient";
import { MyTasksDataInterface } from "../interfaces/tasks.interface";


export const fetchMyTasksList = async (userId: number): Promise<MyTasksDataInterface> => {
    const url = process.env.NEXT_PUBLIC_DOMAIN;

    return getData<MyTasksDataInterface>(url + `/tasks?project=my&userId=${userId}`);
};
