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
   const { data, error } = await supabase.auth.getUser()
  if (error) throw error

  const userId = data.user?.id
  if (!userId) return "Guest"

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("name")
    .eq("id", userId)
    .single()

  if (profileError) throw profileError
  
  return profile?.name ?? "Guest"
  } catch (error) {
    const err = error as AuthError;
    toast.error(`Failed to fetch user name: ${err.message}`);
    return "Guest";
  }  
}