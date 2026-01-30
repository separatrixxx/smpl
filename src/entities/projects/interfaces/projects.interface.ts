export interface ProjectInterface {
    id: number,
    workspace_id: number,
    title: string,
    description: string | null,
    is_starred: boolean,
    tasks_count: number,
    progress: number,
    alias: string,
}
