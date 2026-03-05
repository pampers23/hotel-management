import { supabase } from "@/lib/supabase"

export async function uploadRoomImage(file: File) {
  const filepath = `rooms/${Date.now()}-${file.name}`

  const { error } = await supabase.storage
    .from("upload-images")
    .upload(filepath, file, { upsert: false });

  if (error) throw error;

  const { data } = supabase.storage
    .from("upload-images")
    .getPublicUrl(filepath)

  return data.publicUrl;  
}