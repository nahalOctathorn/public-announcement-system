import React, { useState, useEffect, createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { login, logout, me } from "@/services/auth.api";
import { AuthUser, LoginData } from "@/@types/auth.type";
import { toast } from "sonner";

interface AuthContextType {
  user: AuthUser | undefined;
  isLoading: boolean;
  error: Error | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<Error | null>(null);

  const {
    data: user,
    isLoading,
    isError,
    error: queryError,
  } = useQuery<AuthUser>({
    queryKey: ["me"],
    queryFn: me,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (isError) {
      setError(queryError as Error);
    }
  }, [isError, queryError]);

  const handleLogin = async (data: LoginData) => {
    try {
      setError(null);
      const res = await login(data);

      setTimeout(() => {
        toast.success(res.message || "Logged in successfully");
      }, 300);

      await queryClient.invalidateQueries({ queryKey: ["me"] });
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logout();
      queryClient.setQueryData(["me"], null);

      setTimeout(() => {
        toast.success(res.message || "Logged out successfully");
      }, 200);

     
    } catch (err) {
      setError(err as Error);
    }
  };

  const value = {
    user,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
}
