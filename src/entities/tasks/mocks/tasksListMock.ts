import { getCurrentDate } from "@/shared/utils/date/date";
import { TasksDataInterface, TaskInterface } from "../interfaces/tasks.interface";


export const fetchTasksListMock = async (workspaceId: number, userId: number, projectId?: number): Promise<TasksDataInterface> => {
    if (workspaceId !== 0 && workspaceId !== 1 && workspaceId !== 2) {
        throw new Error("Workspace not found");
    }

    if (userId !== 1) {
        throw new Error("User not found");
    }

    if (projectId && projectId !== 1 && projectId !== 2) {
        throw new Error("Project not found");
    }

    const currentDate = getCurrentDate();

    const taskTodo1MockData: TaskInterface = {
        id: 1,
        title: 'Сверстать сайт-портфолио',
        is_starred: true,
        priority: 1,
        date: currentDate.toISOString(),
        type: 'todo',
        serial: 'PROJ-1',
    };

    const tasksTodo2MockData: TaskInterface = {
        id: 2,
        title: 'Доделать таск-менеджер',
        is_starred: false,
        priority: 4,
        date: '2025-02-15T12:00:00Z',
        type: 'todo',
        serial: 'PROJ-2',
    };

    const tasksProgress1MockData: TaskInterface = {
        id: 3,
        title: 'Диплом',
        is_starred: true,
        priority: 4,
        date: '2025-03-15T12:00:00Z',
        type: 'progress',
        serial: 'PROJ-3',
    };

    const tasksDone1MockData: TaskInterface = {
        id: 4,
        title: 'Прочитать статью на хабре',
        is_starred: false,
        priority: 2,
        date: '2025-02-01T12:00:00Z',
        type: 'done',
        serial: 'PROJ-4',
    };

    const tasksMockData: TasksDataInterface = {
        workspace_id: workspaceId,
        project_id: projectId,
        todo: [taskTodo1MockData, tasksTodo2MockData],
        progress: [tasksProgress1MockData],
        review: [],
        done: [tasksDone1MockData],
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tasksMockData);
        }, 300);
    });
};
