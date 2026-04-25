"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("glitchless_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // localStorage not available during SSR or navigation
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    try {
      localStorage.setItem("glitchless_user", JSON.stringify(userData));
    } catch {
      // localStorage not available
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("glitchless_user");
    } catch {
      // localStorage not available
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  // Return safe defaults instead of throwing - prevents navigation crashes
  if (context === undefined) {
    return {
      user: null,
      isLoggedIn: false,
      login: () => {},
      logout: () => {},
    };
  }
  return context;
}
