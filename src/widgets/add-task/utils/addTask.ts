import { createTask } from "@/entities/tasks/api/tasksListApi";
import { CreateTaskInterface } from "@/entities/tasks/interfaces/tasks.interface";
import { PriorityType } from "@/shared/types/priority";
import { getCurrentDate } from "@/shared/utils/date/date";


interface AddTaskInterface {
    workspaceId: number,
    taskName: string,
    priority: PriorityType,
    setTaskNameError: (e: boolean) => void,
    handleCloseSheet: () => void,
    setIsLoading: (e: boolean) => void,
    onSuccess?: () => void,
}

export function addTask(props: AddTaskInterface) {
    const { workspaceId, taskName, priority, setTaskNameError, handleCloseSheet, setIsLoading, onSuccess } = props;

    setTaskNameError(false);

    if (!taskName) {
        setTaskNameError(true);

        return;
    }

    const data: CreateTaskInterface = {
        workspace_id: workspaceId,
        title: taskName,
        is_starred: false,
        priority,
        date: getCurrentDate().toISOString(),
        type: 'review',
    };

    setIsLoading(true);

    createTask(data)
        .then(() => {
            onSuccess?.();
        })
        .finally(() => {
            setIsLoading(false);
            handleCloseSheet();
        });
}