import { MyTasksDataInterface, TaskInterface } from "../interfaces/tasks.interface";


export const fetchMyTasksListMock = async (userId: number): Promise<MyTasksDataInterface> => {
    if (userId !== 1) {
        throw new Error("User not found");
    }

    const currentDate = new Date();

    const myTask1MockData: TaskInterface = {
        id: 1,
        title: 'Сверстать сайт-портфолио',
        is_starred: true,
        priority: 1,
        date: currentDate.toISOString(),
        type: 'review',
    };

    const myTask2MockData: TaskInterface = {
        id: 2,
        title: 'Доделать таск-менеджер',
        is_starred: false,
        priority: 4,
        date: '2025-02-15T12:00:00Z',
        type: 'review',
    };

    const tasksMockData: MyTasksDataInterface = {
        review: [myTask1MockData, myTask2MockData],
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tasksMockData);
        }, 300);
    });
};
