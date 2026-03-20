import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { usePasswordResetStore } from "@/zustand-store";
import { useAuthStore } from "@/stores/auth-store";

export default function useSessionListener() {
  const passwordResetState = usePasswordResetStore((state) => state.passwordResetState);
  const setPasswordResetState = usePasswordResetStore((state) => state.setPasswordResetState);

  const setSession = useAuthStore((state) => state.setSession);

  // Local loading state inside the hook
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("[SESSION-HOOK] Hook mounted – starting auth sync");

    // 1. Force initial session fetch
    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) {
          console.error("[SESSION-HOOK] getSession error:", error.message);
        } else {
          console.log(
            "[SESSION-HOOK] Initial session from getSession:",
            data.session ? "FOUND" : "NULL",
            data.session?.user?.email || "no user"
          );
          setSession(data.session ?? null);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("[SESSION-HOOK] getSession failed:", err);
        setIsLoading(false);
      });

    // 2. Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log(
        "[SESSION-HOOK] Event:",
        event,
        "– Session present?",
        !!newSession,
        newSession?.user?.email || ""
      );

      if (event === "INITIAL_SESSION" || event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        console.log("[SESSION-HOOK] Setting session in Zustand");
        setSession(newSession ?? null);
      }

      // Password recovery mode
      if (event === "PASSWORD_RECOVERY") {
        setPasswordResetState(true);
        console.log("[SESSION-HOOK] Password recovery mode activated");
        // Usually keep session so user info is available
        setSession(newSession ?? null);
      }

      // Optional: signed out handling
      if (event === "SIGNED_OUT") {
        setSession(null);
      }
    });

    return () => {
      console.log("[SESSION-HOOK] Cleaning up listener");
      listener.subscription.unsubscribe();
    };
  }, [setSession, setPasswordResetState]);

  // ── This is the important part ──
  // Return current values so the context can use them
  return {
    isLoading,
    session: useAuthStore((s) => s.session), // live value from store
    passwordResetState,
  };
}