import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { useAuth } from "@/contexts/AuthContext";

/** Client-side session guard (the app is fully offline / local-first). */
export function useRequireAuth() {
  const { user, isReady } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isReady && !user) navigate({ to: "/login", replace: true });
  }, [isReady, user, navigate]);

  return { user, isReady };
}
