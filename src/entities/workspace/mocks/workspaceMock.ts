import { WorkspaceInterface } from "../interfaces/workspace.interface";


export const fetchWorkspaceMock = async (id: number): Promise<WorkspaceInterface> => {
    if (id !== 1 && id !== 2) {
        throw new Error("Workspace not found");
    }

    const workspace1MockData: WorkspaceInterface = {
        id: 1,
        title: 'Pipa workspace',
        description: null,
        tasks_info: {
            completed: 5,
            total: 7,
        },
        isMyWorkspace: false,
    };

    const workspace2MockData: WorkspaceInterface = {
        id: 2,
        title: 'Ultra team',
        description: 'Super mega ultra team',
        tasks_info: {
            completed: 4,
            total: 23,
        },
        isMyWorkspace: false,
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([workspace1MockData, workspace2MockData][id - 1]);
        }, 1000);
    });
};
