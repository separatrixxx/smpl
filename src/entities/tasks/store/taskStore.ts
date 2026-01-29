import { create } from 'zustand'
import { TasksStateInterface, TaskTypeStateInterface } from '../interfaces/tasks.interface';


export const useTaskTypeStore = create<TaskTypeStateInterface>((set) => ({
    taskType: 'todo',
    setTaskType: (taskType) => set({ taskType }),
}));

export const useTasksStore = create<TasksStateInterface>((set) => ({
    tasks: null,
    setTasks: (tasks) => set({ tasks }),
}));
