import { create } from 'zustand'
import { UserStateInterface } from '../interfaces/user.interface';


export const useUserStore = create<UserStateInterface>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));
