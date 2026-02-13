import { supabase } from "@/lib/supabase";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "sonner";

export async function getSession() {
   const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
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

export async function getProfile() {
  try {
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError || !authData.user) return null

    const authUser = authData.user

    const { data: row } = await supabase
      .from("users")
      .select("name, avatar_url")
      .eq("id", authUser.id)
      .maybeSingle()

    const displayName = 
      row?.name || 
      authUser.user_metadata?.name ||
      authUser.user_metadata?.full_name ||  
      authUser.email ||
      "Guest"

      const avatarUrl = 
        row?.avatar_url ||
        authUser.user_metadata?.avatar_url ||
        authUser.user_metadata?.picture ||
        null

    return { displayName, avatarUrl }

  } catch (error) {
    const err = error as AuthError;
    toast.error(`Failed to fetch profile: ${err.message}`);
    return null;
  }
}

export async function updateAvatar(file: File) {
  try {
    const { data: auth  } = await supabase.auth.getUser()
    const userId = auth.user?.id
    if (!userId) throw new Error("Not logged in")

    const ext = file.name.split('.').pop() || "jpg"
    const path = `${userId}/avatar.${ext}`

    const { error: uploadError } = await supabase.storage
      .from("upload-images")
      .upload(path, file, { upsert: true })

    if (uploadError) throw uploadError

    const { data: pub } = supabase.storage.from("upload-images").getPublicUrl(path)
    const avatar_url = pub.publicUrl

    const { error: dbError } = await supabase
      .from("users")
      .upsert({ id: userId, avatar_url }, { onConflict: "id" })  

    if (dbError) throw dbError

    toast.success("Avatar updated successfully!")

    return avatar_url
  } catch (error) {
    const err = error as AuthError;
    toast.error(`Failed to update avatar: ${err.message}`);
  }
}