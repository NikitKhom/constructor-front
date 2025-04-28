import { useState, useEffect, createContext } from 'react';
import Cookies from 'js-cookie';
import { checkAuth, login, register } from '../api/auth';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { email: string; password: string; username: string; avatar?: string }) => Promise<any | false>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      setIsLoading(true);
      const isAuthenticated = await checkAuth();
      setIsLoggedIn(isAuthenticated);
      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoggedIn(success);
    setIsLoading(false);
    return success;
  };

  const handleRegister = async (data: {
    email: string;
    password: string;
    username: string;
    avatar?: string;
  }): Promise<any | false> => {
    setIsLoading(true);
    const user = await register(data);
    setIsLoggedIn(!!user);
    setIsLoading(false);
    return user;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove('authToken');
  };

  const value: AuthContextType = {
    isLoggedIn,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};