import { createContext, useContext, useMemo, useState } from "react";
import api from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const response = await api.post("/users/login", { username, password });
    setUser(response.data.user || null);
    return response.data;
  };

  const register = async (payload) => {
    const response = await api.post("/users/register", payload);
    return response.data;
  };

  const logout = async () => {
    await api.post("/users/logout");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
