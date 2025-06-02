import { useState, useEffect, createContext } from 'react';
import { checkAuth, login, register, logout as logoutApi } from '../api/auth';
import { getUser as getUserApi } from '../api/user';

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { email: string; password: string; name: string; avatar?: string }) => Promise<any | false>;
  logout: () => Promise<void>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      setIsLoading(true);
      const isAuthenticated = await checkAuth();
      setIsLoggedIn(isAuthenticated);
      if (isAuthenticated) {
        const user = await getUserApi();
        setUserData(user);
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoggedIn(success);
    if (success) {
      const user = await getUserApi();
      setUserData(user);
    }
    setIsLoading(false);
    return success;
  };

  const handleRegister = async (data: {
    email: string;
    password: string;
    name: string;
  }): Promise<any | false> => {
    setIsLoading(true);
    const user = await register(data);
    setIsLoggedIn(!!user);
    if (user) {
      const userDataResponse = await getUserApi();
      setUserData(userDataResponse);
    }
    setIsLoading(false);
    return user;
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logoutApi();
      setIsLoggedIn(false);
      setUserData(null);
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    isLoggedIn,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    userData,
    setUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};