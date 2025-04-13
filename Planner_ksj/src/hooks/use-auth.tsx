import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/lib/types';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: (email: string, name: string, googleId: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // localStorage에서 토큰 가져오기
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async (authToken: string) => {
    try {
      const userData = await api.getUser(authToken);
      setUser(userData);
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.login({ email, password });
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      toast({
        title: '로그인 성공',
        description: '환영합니다!',
      });
    } catch (error) {
      console.error('로그인 실패:', error);
      toast({
        title: '로그인 실패',
        description: error instanceof Error ? error.message : '로그인에 실패했습니다.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async (email: string, name: string, googleId: string) => {
    setIsLoading(true);
    try {
      const response = await api.googleAuth({ email, name, googleId });
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      toast({
        title: '구글 로그인 성공',
        description: '환영합니다!',
      });
    } catch (error) {
      console.error('구글 로그인 실패:', error);
      toast({
        title: '구글 로그인 실패',
        description: error instanceof Error ? error.message : '구글 로그인에 실패했습니다.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.register({ name, email, password });
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      toast({
        title: '회원가입 성공',
        description: '환영합니다!',
      });
    } catch (error) {
      console.error('회원가입 실패:', error);
      toast({
        title: '회원가입 실패',
        description: error instanceof Error ? error.message : '회원가입에 실패했습니다.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        googleLogin,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내부에서 사용해야 합니다');
  }
  return context;
};