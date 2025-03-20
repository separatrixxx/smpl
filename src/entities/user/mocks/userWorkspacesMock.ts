import { UserWorkspacesInterface } from "../interfaces/user.interface";


export const fetchUserWorkspacesMock = async (id: number): Promise<UserWorkspacesInterface> => {
    const userWorkspacesMockData: UserWorkspacesInterface = {
        userId: id,
        workspaces: [
            {
                id: 0,
                title: 'My workspace',
                description: null,
                tasks_info: {
                    completed: 3,
                    total: 10,
                },
                is_my_workspace: true,
            },
            {
                id: 1,
                title: 'Pipa workspace',
                description: null,
                tasks_info: {
                    completed: 5,
                    total: 7,
                },
                is_my_workspace: false,
            },
            {
                id: 2,
                title: 'Ultra team',
                description: 'Super mega ultra team',
                tasks_info: {
                    completed: 4,
                    total: 23,
                },
                is_my_workspace: false,
            },
        ],
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(userWorkspacesMockData);
        }, 300);
    });
};
