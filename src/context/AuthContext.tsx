import type { User } from "user";
import React, { createContext, useEffect, useState } from "react";
import { useAuthStore } from "@components/Login/store/useAuthStore";
import { useNavigate } from "react-router-dom";

export interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  handleLogin: (userData: User) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated: isAuth, logout } = useAuthStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAuth);

  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const { user } = useAuthStore.getState();
      setUser(user);
    }
  }, [isAuthenticated]);
  const handleLogin = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
    navigate("/cms/segments");
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    await logout();
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
