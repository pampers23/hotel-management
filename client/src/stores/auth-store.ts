import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types/types'
import { mockUser } from '@/data/data'

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean, error?: string }>;
    register: (name: string, email: string, password: string) => Promise<{ success: boolean, error?: string }>
    logout: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            login: async (email: string, password: string) => {
                set({ isLoading: true });

                await new Promise((resolve) => setTimeout(resolve, 1000));

                if (email && password.length >= 6) {
                    set({
                        user: { ...mockUser, email },
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return { success: true };
                }

                set({ isLoading: false });
                return { success: false, error: `Invalid credentials` };
            },

            register: async (name: string, email: string, password: string) => {
                set({ isLoading: true });

                await new Promise((resolve) => setTimeout(resolve, 1000));

                if (name && email && password.length >= 6) {
                    set({
                        user: { ...mockUser, name, email },
                        isAuthenticated: true,
                        isLoading: false,
                    })
                    return { success: true };
                }

                set({ isLoading: false });
                return { success: false, error: `Please fill all fields correctly` }
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage',
        }
    )
)