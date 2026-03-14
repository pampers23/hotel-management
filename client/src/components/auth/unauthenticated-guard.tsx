import useSession from "@/hooks/use-session";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

function UnauthenticatedGuard({ children } : { childred: ReactNode }) {
  const { session, passwordResetState } = useSession();

  if (session && !passwordResetState) {
    return <Navigate to={"/dashboard"} />
  }  

  return <>{children}</>;
}

export default UnauthenticatedGuard;