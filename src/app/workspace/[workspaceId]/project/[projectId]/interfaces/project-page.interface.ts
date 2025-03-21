export interface ProjectPageInterface {
    params: Promise<{ 
        workspaceId: string,
        projectId: string,
    }>,
}
