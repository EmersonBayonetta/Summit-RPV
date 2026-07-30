import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { sessionService, userService, type SignInInput, type SignUpInput } from "@/services/user.service";
import type { PublicUser } from "@/types";

interface AuthContextValue {
  user: PublicUser | null;
  isReady: boolean;
  signIn: (input: SignInInput) => PublicUser;
  signUp: (input: SignUpInput) => PublicUser;
  signOut: () => void;
  updateProfile: (changes: Partial<Pick<PublicUser, "nome" | "email" | "deficiencia">>) => PublicUser;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const session = sessionService.get();
    if (session) setUser(userService.findById(session.userId));
    setIsReady(true);
  }, []);

  const signIn = useCallback((input: SignInInput) => {
    const authenticated = userService.signIn(input);
    sessionService.save(authenticated.id);
    setUser(authenticated);
    return authenticated;
  }, []);

  const signUp = useCallback((input: SignUpInput) => {
    const created = userService.signUp(input);
    sessionService.save(created.id);
    setUser(created);
    return created;
  }, []);

  const signOut = useCallback(() => {
    sessionService.clear();
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    (changes: Partial<Pick<PublicUser, "nome" | "email" | "deficiencia">>) => {
      if (!user) throw new Error("Nenhum usuário autenticado.");
      const updated = userService.update(user.id, changes);
      setUser(updated);
      return updated;
    },
    [user],
  );

  const value = useMemo(
    () => ({ user, isReady, signIn, signUp, signOut, updateProfile }),
    [user, isReady, signIn, signUp, signOut, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  return context;
}
