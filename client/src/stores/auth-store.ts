import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types/types'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  accessToken: string | null
  refreshToken: string | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      accessToken: null,
      refreshToken: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true })

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            })

            if (!res.ok) {
            const text = await res.text()
            set({ isLoading: false })
            return { success: false, error: text || 'Invalid credentials' }
            }

            const data: {
            message: string
            user: { id: string; email: string; name: string; role: string }
            session: {
                access_token: string
                refresh_token: string
                user: { created_at: string; phone: string | null; user_metadata?: { avatar?: string } }
            }
            } = await res.json()

            const mappedUser: User = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            phone: data.session.user.phone ?? undefined,
            avatar: data.session.user.user_metadata?.avatar,
            memberSince: new Date(data.session.user.created_at),
            }

            set({
            user: mappedUser,
            isAuthenticated: true,
            isLoading: false,
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            })

            return { success: true }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
                set({ isLoading: false })
                return { success: false, error: errorMessage }
            }
        },


      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true })

        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/sign-up`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          })

          if (!res.ok) {
            const text = await res.text()
            set({ isLoading: false })
            return { success: false, error: text || 'Registration failed' }
          }

          const data = await res.json()

          // Your backend signup currently returns { message, user }
          // It may not return a session (since email verification may be required).
          set({
            user: (data.user
              ? {
                  id: data.user.id,
                  email: data.user.email,
                  name: data.user.user_metadata?.name,
                  role: data.user.user_metadata?.role || 'customer',
                }
              : null) as User | null,
            isAuthenticated: Boolean(data.session), // usually false if verification required
            isLoading: false,
            accessToken: data.session?.access_token ?? null,
            refreshToken: data.session?.refresh_token ?? null,
          })

          return { success: true }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
          set({ isLoading: false })
          return { success: false, error: errorMessage }
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
        })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
