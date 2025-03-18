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
        first_name: 'Teammate 1',
        last_name: null,
        username: null,
        photo_url: 'https://sun9-43.userapi.com/impg/RRoZe7RxYAe0hA3G8x77QvFqGnoqNDPj461L2w/ZigOJ1mYuh4.jpg?size=992x992&quality=96&sign=100957cc83322f034b0dc9f061d9a63f&type=album',
    };

    const teammate2MockData: UserInterface = {
        id: 3,
        first_name: 'Teammate 2',
        last_name: null,
        username: null,
        photo_url: 'https://sun1-91.userapi.com/impf/c857428/v857428329/80e56/9oR3vQFXplg.jpg?size=1440x2160&quality=96&sign=4ca5edea59cb5556aa37dc1fa6329265&type=album',
    };

    const teammate3MockData: UserInterface = {
        id: 4,
        first_name: 'Teammate 3',
        last_name: null,
        username: null,
        photo_url: 'https://sun9-16.userapi.com/impg/SrgHZG2UCWBTp0yjOwjrpZK-ME9h0k52jZFA9w/72wDL7od86Q.jpg?size=1620x2160&quality=95&sign=53a47823ae2e9f8bb9c97da14698d854&type=album',
    };

    const teammate4MockData: UserInterface = {
        id: 5,
        first_name: 'Teammate 4',
        last_name: null,
        username: null,
        photo_url: 'https://sun9-75.userapi.com/impg/3x58poZN0W0_4q8WEQ2_yhYe2XChyZ3iPJEm8A/SuHyP-GMGuI.jpg?size=853x1280&quality=95&sign=4b55d54a34ffe689be8426365a3da05b&type=album',
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
