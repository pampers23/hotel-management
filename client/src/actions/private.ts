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
    const { data } = await supabase.auth.getUser()
    
    return data.user?.user_metadata?.name ?? "Guest"
  } catch (error) {
    const err = error as AuthError;
    toast.error(`Failed to fetch user name: ${err.message}`);
    return "Guest";
  }  
}