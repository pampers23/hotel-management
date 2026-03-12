import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Session, User as SupabaseUser } from "@supabase/supabase-js";

interface AuthStore {
  user: SupabaseUser | null;
  session: Session | null;
  isLoading: boolean;
  _hasHydrated: boolean;
  setLoading: (v: boolean) => void;
  setSession: (session: Session | null) => void;
  logout: () => void;
  setHasHydrated: (v: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isLoading: false,
      _hasHydrated: false,


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
        setHasHydrated: (v) => set({ _hasHydrated: v })
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        session: state.session,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);