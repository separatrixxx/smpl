import { TaskInterface } from "../interfaces/tasks.interface";


export const fetchTasksListMock = async (workspaceId: number, userId: number, projectId?: number): Promise<TaskInterface[]> => {
    if (workspaceId !== 0 && workspaceId !== 1 && workspaceId !== 2) {
        throw new Error("Workspace not found");
    }

    if (userId !== 1) {
        throw new Error("User not found");
    }

    if (projectId && projectId !== 1 && projectId !== 2) {
        throw new Error("Project not found");
    }

    const currentDate = new Date();

    const tasks1MockData: TaskInterface = {
        id: 1,
        workspace_id: workspaceId,
        project_id: projectId,
        title: 'Сверстать сайт-портфолио',
        is_starred: true,
        priority: 1,
        date: currentDate.toISOString(),
        type: 'todo',
    };

    const tasks2MockData: TaskInterface = {
        id: 2,
        workspace_id: workspaceId,
        project_id: projectId,
        title: 'Доделать таск-менеджер',
        is_starred: false,
        priority: 4,
        date: '2025-02-15T12:00:00Z',
        type: 'progress',
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([tasks1MockData, tasks2MockData]);
        }, 300);
    });
};
