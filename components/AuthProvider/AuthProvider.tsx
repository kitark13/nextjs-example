"use client";

import { checkSession, getMe } from "@/lib/api";
import { useAuthStore } from "@/lib/stores/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.cleareisAuthenticated
  );

  useEffect(() => {
    const fetchUser = async () => {
      const IsAuthenticated = await checkSession();
      if (IsAuthenticated) {
        const user = await getMe();
        if (user) setUser(user);
      } else {
        clearIsAuthenticated();
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
