import { useMutation } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"

export function SignUp() {
  return useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string
      email: string
      password: string
    }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: "http://localhost:5173/",
        },
      })

      if (error) throw error
      return data
    },
  })
}
