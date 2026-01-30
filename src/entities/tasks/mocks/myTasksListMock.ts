import { getCurrentDate } from "@/shared/utils/date/date";
import { TaskInterface, TasksDataInterface } from "../interfaces/tasks.interface";


export const fetchMyTasksListMock = async (userId: number): Promise<TasksDataInterface> => {
    if (userId !== 1) {
        throw new Error("User not found");
    }

    const currentDate = getCurrentDate();

    const myTask1MockData: TaskInterface = {
        id: 1,
        title: 'Сверстать сайт-портфолио',
        is_starred: true,
        priority: 1,
        date: currentDate.toISOString(),
        type: 'review',
        serial: 'user-1',
    };

    const myTask2MockData: TaskInterface = {
        id: 2,
        title: 'Доделать таск-менеджер',
        is_starred: false,
        priority: 4,
        date: '2025-02-15T12:00:00Z',
        type: 'review',
        serial: 'user-2',
    };

    const tasksMockData: TasksDataInterface = {
        workspace_id: 1,
        todo: [],
        progress: [],
        review: [myTask1MockData, myTask2MockData],
        done: [],
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tasksMockData);
        }, 300);
    });
};
