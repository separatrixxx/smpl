export interface WorkspaceInterface {
    id: number,
    title: string,
    description: string | null,
    tasks_info: {
        completed: number,
        total: number,
    },
    isMyWorkspace: boolean,
}

export interface WorkspaceStateInterface {
    workspace: number;
    setWorkspace: (workspace: number) => void;
}
