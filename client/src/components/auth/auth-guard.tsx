import type { ReactNode } from "react";
import { Navigate } from "react-router";
import useSession from "@/hooks/use-session";

function AuthGuard({ children } : { childred: ReactNode }) {
  const { session } = useSession();

  if (!session) {
    return <Navigate to={"/login"} />
  }  
  return <>{children}</>;
}

export default AuthGuard