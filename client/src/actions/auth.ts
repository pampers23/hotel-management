import { supabase } from "@/lib/supabase"
import type { LoginSchema, SignUpSchema } from "@/zod-schema"
import { AuthError } from "@supabase/supabase-js"
import { toast } from "sonner"

export async function signUp({ name, email, password }: SignUpSchema) {
    try {
      const { error } = await supabase.auth.signUp({
        options: {
          data: {
            name: name,
          },
        },
        email,
        password,
      })  

      if (error) throw new Error(error.message);

      toast.success("Email verification has been sent!", {
        description: "Please check your email to confirm your account",
      });
    } catch (error) {
      const err = error as AuthError;
      toast.error("Sign Up Failed", {
        description: err.message,
      });
    }
}

export async function login({ email, password }: LoginSchema) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      toast.success("Login successful!");
    } catch (error) {
        const err = error as AuthError;
        toast.error("Login Failed", {
          description: err.message,
        });
    }
}