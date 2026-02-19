import { supabase } from "@/lib/supabase"
import type { LoginSchema, SignUpSchema } from "@/zod-schema"
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

      if (error) throw new Error(error.message);

      toast.success("Login successful!");

      return data;
    } catch (error) {
        const err = error as AuthError;
        toast.error("Login Failed", {
          description: err.message,
        });
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