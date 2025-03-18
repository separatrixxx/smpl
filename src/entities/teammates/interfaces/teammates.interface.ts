import { UserInterface } from "@/entities/user/interfaces/user.interface";


export interface TeammatesInterface {
    workspaceId: number,
    teammates: UserInterface[],
}
