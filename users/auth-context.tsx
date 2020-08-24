import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import decode from "jwt-decode";
import { User } from "./types";

interface AuthHelpers {
  isAuthenticated: boolean;
  user?: User;
  loading: boolean;
  setAuth: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthHelpers>({} as AuthHelpers);

export const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("auth_token");
      if (token) {
        const user = decode<User>(token);
        if (user) setUser(user);
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const setAuth = (token: string) => {
    if (token) {
      const user = decode<User>(token);
      if (user) {
        localStorage.setItem("auth_token", token);
        setUser(user);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, setAuth, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
