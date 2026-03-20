import { create } from 'zustand'
import type { Session } from '@supabase/supabase-js'

interface AuthState {
  session: Session | null
  isLoading: boolean
  passwordResetState: boolean

  setSession: (session: Session | null) => void
  setLoading: (loading: boolean) => void
  setPasswordReset: (active: boolean) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  session: null,
  isLoading: true,              // start as loading
  passwordResetState: false,

  setSession: (session) => set({ session, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  setPasswordReset: (active) => set({ passwordResetState: active }),
  clearSession: () => set({ session: null, isLoading: false }),
}))