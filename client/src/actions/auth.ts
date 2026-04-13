import { supabase } from "@/lib/supabase"
import type { LoginSchema, SignUpSchema } from "@/zod-schema"
import { usePasswordResetStore } from "@/zustand-store"
import { AuthError } from "@supabase/supabase-js"
import { toast } from "sonner"

export async function userSignUp({ name, email, password }: SignUpSchema) {
    try {
      const { data, error } = await supabase.auth.signUp({
        options: {
          data: {
            name: name,
          },
        },
        email,
        password,
      })  
      
      if (error?.message.includes("User already registered")) {
        toast.error("This email is already registered. Please log in instead.");
        return;
      }

      toast.success("Email verification has been sent!", {
        description: "Please check your email to confirm your account",
      });

      return data;
    } catch (error) {
      const err = error as AuthError;
      toast.error("Sign Up Failed", {
        description: err.message,
      });
    }
}

export async function userLogin({ email, password }: LoginSchema) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!error && data.session) {
        console.log("[LOGIN] Supabase gave session:", data.session.user.email);
      }
      
      if (!data.session) {
        return {
          success: false,
          needConfirmation: true,
          message: "Please check your email inbox (and spam folder) for a confirmation link before you can log in.",
          user: data.user
        }
      }

      return {
        success: true,
        session: data.session,
        user: data.user
      }
    } catch (error) {
        console.error(error);
        return {
          success: false,
          needConfirmation: false,
          message: "An unexpected error occurred.",
        }
    }
}

export async function userLogout() {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw new Error(error.message)
        }
    } catch (error) {
        const err = error as AuthError;
        toast.error(err.message)
    }
}

export async function sendPasswordResetLink({ email } : { email: string }) {
  try {
    const { data, error: fetchUserError } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .limit(1)

    if (fetchUserError) {
      throw new Error(fetchUserError.message);
    }  

    if (!data || !data.length) {
      throw new Error("No account fount with that email");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      throw new Error(error.message);
    }

    toast.success("Password reset link has been sent!", {
      description: "Please check your email to continue"
    });
  } catch (error) {
    const err = error as AuthError;
    toast.error(err.message);
  }
}

export async function authUpdatePassword({ password }: { password: string }) {
  try {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    usePasswordResetStore.getState().setPasswordResetState(false);

    await supabase.auth.signOut();

    toast.success("Password has been reset", {
      description: "You can now log in with your new password.",
    });
  } catch (error) {
    const err = error as AuthError;
    toast.error(err.message);
  }
}

export async function updatePassword({ password }: { password: string }) {
  try {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    toast.success("Password updated!", {
      description: "Your password has been changed successfully.",
    });
  } catch (error) {
    const err = error as AuthError;
    toast.error(err.message);
  }
}