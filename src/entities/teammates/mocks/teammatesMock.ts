import { UserInterface } from "@/entities/user/interfaces/user.interface";
import { TeammatesInterface } from "../interfaces/teammates.interface";


export const fetchTeammatesMock = async (workspaceId: number, userId: number): Promise<TeammatesInterface> => {
    if (workspaceId !== 1 && workspaceId !== 2) {
        throw new Error("Workspace not found");
    }

    if (userId !== 1) {
        throw new Error("User not found");
    }

    const teammate1MockData: UserInterface = {
        id: 2,
        telegram_id: '100000001',
        first_name: 'Teammate 1',
        last_name: null,
        username: null,
    };

    const teammate2MockData: UserInterface = {
        id: 3,
        telegram_id: '100000002',
        first_name: 'Teammate 2',
        last_name: null,
        username: null,
    };

    const teammate3MockData: UserInterface = {
        id: 4,
        telegram_id: '100000003',
        first_name: 'Teammate 3',
        last_name: null,
        username: null,
    };

    const teammate4MockData: UserInterface = {
        id: 5,
        telegram_id: '100000004',
        first_name: 'Teammate 4',
        last_name: null,
        username: null,
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                workspaceId: workspaceId,
                teammates: [teammate1MockData, teammate2MockData, teammate3MockData, teammate4MockData],
            });
        }, 300);
    });
};
