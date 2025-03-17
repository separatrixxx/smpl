import { create } from 'zustand'
import { WorkspaceStateInterface } from '../interfaces/workspace.interface';


export const useWorkspaceStore = create<WorkspaceStateInterface>((set) => ({
    workspace: 0,
    setWorkspace: (workspace) => set({ workspace }),
}));
