import { WorkspaceInterface } from "../interfaces/workspace.interface";


export const fetchWorkspaceMock = async (workspaceId: number, userId: number): Promise<WorkspaceInterface> => {
    if (workspaceId !== 1 && workspaceId !== 2) {
        throw new Error("Workspace not found");
    }

    if (userId !== 1) {
        throw new Error("User not found");
    }

    const workspace1MockData: WorkspaceInterface = {
        id: 1,
        title: 'Pipa workspace',
        description: null,
        tasks_info: {
            completed: 5,
            total: 7,
        },
        is_my_workspace: false,
    };

    const workspace2MockData: WorkspaceInterface = {
        id: 2,
        title: 'Ultra team',
        description: 'Super mega ultra team',
        tasks_info: {
            completed: 4,
            total: 23,
        },
        is_my_workspace: false,
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([workspace1MockData, workspace2MockData][workspaceId - 1]);
        }, 300);
    });
};
