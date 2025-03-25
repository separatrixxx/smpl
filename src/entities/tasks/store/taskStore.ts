import { create } from 'zustand'
import { TaskStateInterface } from '../interfaces/tasks.interface';


export const useTaskTypeStore = create<TaskStateInterface>((set) => ({
    taskType: 'todo',
    setTaskType: (taskType) => set({ taskType }),
}));
