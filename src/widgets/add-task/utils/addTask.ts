import { createTask } from "@/entities/tasks/api/tasksListApi";
import { CreateTaskInterface, TaskInterface } from "@/entities/tasks/interfaces/tasks.interface";
import { PriorityType } from "@/shared/types/priority";
import { getCurrentDate } from "@/shared/utils/date/date";


let tempIdCounter = -1;

interface AddTaskInterface {
    workspaceId: number,
    telegramId?: string | number,
    projectId?: number,
    taskName: string,
    priority: PriorityType,
    setTaskNameError: (e: boolean) => void,
    handleCloseSheet: () => void,
    addTaskToStore: (task: TaskInterface) => void,
    replaceTaskInStore: (tempId: number, realTask: TaskInterface) => void,
}

export function addTask(props: AddTaskInterface) {
    const { workspaceId, telegramId, projectId, taskName, priority, setTaskNameError, handleCloseSheet, addTaskToStore, replaceTaskInStore } = props;

    setTaskNameError(false);

    if (!taskName) {
        setTaskNameError(true);

        return;
    }

    const date = getCurrentDate().toISOString();
    const type = projectId ? 'todo' : 'review';
    const tempId = tempIdCounter--;

    const optimisticTask: TaskInterface = {
        id: tempId,
        title: taskName,
        is_starred: false,
        priority,
        date,
        type,
        serial: '',
    };

    addTaskToStore(optimisticTask);
    handleCloseSheet();

    const data: CreateTaskInterface = {
        workspace_id: workspaceId,
        project_id: projectId,
        telegram_id: telegramId,
        title: taskName,
        is_starred: false,
        priority,
        date,
        type,
    };

    createTask(data).then((realTask) => {
        replaceTaskInStore(tempId, realTask);
    });
}