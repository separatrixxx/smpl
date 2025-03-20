import { ProjectInterface } from "../interfaces/projects.interface";


export const fetchProjectsListMock = async (workspaceId: number, userId: number): Promise<ProjectInterface[]> => {
    if (workspaceId !== 1 && workspaceId !== 2) {
        throw new Error("Workspace not found");
    }

    if (userId !== 1) {
        throw new Error("User not found");
    }

    const project1MockData: ProjectInterface = {
        id: 1,
        workspace_id: workspaceId,
        title: 'Лендинг для амнямов',
        description: null,
        is_starred: true,
        tasks_count: 13,
        progress: 89,
    };

    const project2MockData: ProjectInterface = {
        id: 2,
        workspace_id: workspaceId,
        title: 'Мобильное приложение Йоу-мойоу ультра супер',
        description: null,
        is_starred: false,
        tasks_count: 0,
        progress: 13,
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([project1MockData, project2MockData]);
        }, 300);
    });
};
