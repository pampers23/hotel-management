import { supabase } from "@/lib/supabase";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "sonner";

export async function getSession() {
  const { data, error  } = await supabase.auth.getSession()
  if (error) throw error
  return data.session  
}

export async function getUserName() {
  try {
   const { data: authUserData, error: authUserError } = await supabase.auth.getUser();
   if (authUserError) throw authUserError;

   const userId = authUserData.user?.id
   if (!userId) return "Guest";

   const { data, error } = await supabase
      .from('users') 
      .select("name")
      .eq("id", userId)
      .single();

    if (error) throw error;

    return data?.name || "Guest";
  } catch (error) {
    const err = error as AuthError;
    toast.error(`Failed to fetch user name: ${err.message}`);
    return "Guest";
  }  
}