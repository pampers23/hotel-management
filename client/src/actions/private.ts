import { supabase } from "@/lib/supabase";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "sonner";

export async function getSession() {
   const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data  
}

export async function getUserName() {
  try {
   const { data: auth, error: authError } = await supabase.auth.getUser()

  // logged out -> normal
  if (authError || !auth.user?.id) return "Guest"

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("name")
    .eq("id", auth.user.id)
    .single()

  if (profileError) return "Guest"
  return profile?.name ?? "Guest"
  } catch (error) {
    const err = error as AuthError;
    toast.error(`Failed to fetch user name: ${err.message}`);
    return "Guest";
  }  
}