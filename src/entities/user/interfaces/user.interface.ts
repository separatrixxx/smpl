import { WorkspaceInterface } from "@/entities/workspace/interfaces/workspace.interface";


export interface UserInterface extends UserDataInterface {
    id: number,
    telegram_id: string,
}

export interface UserDataInterface {
    first_name: string,
    last_name: string | null,
    username: string | null,
    photo_url: string | null,
}

export interface CreateUserDataInterface extends UserDataInterface {
    telegram_id: number,
}

export interface UserWorkspacesInterface {
    userId: number,
    workspaces: WorkspaceInterface[],
}

export interface UserStateInterface {
    user: UserInterface | null,
    setUser: (user: UserInterface) => void,
    clearUser: () => void,
}
