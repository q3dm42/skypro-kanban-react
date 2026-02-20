import React, { createContext, useState, useEffect, useContext } from "react";
import { isAuthenticated } from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Проверяем авторизацию при монтировании компонента
  useEffect(() => {
    setIsAuth(isAuthenticated());
    setLoading(false);
  }, []);

  // Функция для логина
  const handleLogin = () => {
    setIsAuth(true);
  };

  // Функция для логаута
  const handleLogout = () => {
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, loading, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook для использования AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен быть использован внутри AuthProvider");
  }
  return context;
};
