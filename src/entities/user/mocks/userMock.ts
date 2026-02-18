import { UserInterface } from "../interfaces/user.interface";


export const fetchUserMock = async (id: number): Promise<UserInterface> => {
    const userMockData: UserInterface = {
        id: id,
        telegram_id: '123456789',
        first_name: 'separatrix',
        last_name: null,
        username: 'separatrix',
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(userMockData);
        }, 300);
    });
};
