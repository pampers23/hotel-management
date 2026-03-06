import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session, User as SupabaseUser } from "@supabase/supabase-js";

interface AuthStore {
  user: SupabaseUser | null;
  session: Session | null;
  isLoading: boolean;
  setLoading: (v: boolean) => void;
  setSession: (session: Session | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isLoading: false,

      setLoading: (v) => set({ isLoading: v }),

      setSession: (session) =>
        set({
          session,
          user: session?.user ?? null,
        }),

      logout: () =>
        set({
          session: null,
          user: null,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        session: state.session,
        user: state.user,
      }),
    }
  )
);