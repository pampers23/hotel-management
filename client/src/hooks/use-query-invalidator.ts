import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

export function QueryInvalidator() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      console.log('[QUERY-INVALIDATOR] Auth event:', event);
        

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        console.log('[QUERY-INVALIDATOR] Invalidating session & profile');
        queryClient.invalidateQueries({ queryKey: ['session'] });
        queryClient.invalidateQueries({ queryKey: ['profile'] })
      }

      if (event === 'SIGNED_OUT') {
        queryClient.setQueryData(['session'], null);
        queryClient.setQueryData(['profile'], null);
        queryClient.invalidateQueries({ queryKey: ['session'] });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  return null; 
}