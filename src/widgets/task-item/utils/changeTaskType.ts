import { updateTask } from "@/entities/tasks/api/tasksListApi";
import { UpdateTaskInterface } from "@/entities/tasks/interfaces/tasks.interface";


interface ChangeTaskInterface {
    id: number,
    data: UpdateTaskInterface,
    onSuccess?: () => void,
}

export async function changeTask({ id, data, onSuccess }: ChangeTaskInterface) {
    const result = await updateTask(id, data);

    if (onSuccess) {
        onSuccess();
    }

    return result;
}
