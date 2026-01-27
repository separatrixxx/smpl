export interface WorkspaceInterface {
    id: number,
    title: string,
    description: string | null,
    tasks_info: {
        completed: number,
        total: number,
    },
    is_my_workspace: boolean,
    owner: number;
    teammates: number[],
}

export interface WorkspaceStateInterface {
    workspace: number,
    setWorkspace: (workspace: number) => void,
}
