import { create } from 'zustand'
import { TasksStateInterface, TaskTypeStateInterface } from '../interfaces/tasks.interface';
import { TaskType } from '@/shared/types/task-type';


export const useTaskTypeStore = create<TaskTypeStateInterface>((set) => ({
    taskType: 'todo',
    setTaskType: (taskType) => set({ taskType }),
}));

export const useTasksStore = create<TasksStateInterface>((set, get) => ({
    tasks: null,
    setTasks: (tasks) => set({ tasks }),
    moveTask: (taskId: number, fromType: TaskType, toType: TaskType) => {
        const { tasks } = get();

        if (!tasks) {
            return;
        }
        
        const task = tasks[fromType].find(t => t.id === taskId);

        if (!task) {
            return;
        }

        set({
            tasks: {
                ...tasks,
                [fromType]: tasks[fromType].filter(t => t.id !== taskId),
                [toType]: [...tasks[toType], { ...task, type: toType }],
            },
        });
    },
}));
