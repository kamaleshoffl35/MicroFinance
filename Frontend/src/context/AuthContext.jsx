import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authApi } from '../api/authApi';
import { tokenStore } from '../api/axiosInstance';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  const clearSession = useCallback(() => {
    tokenStore.clearAccessToken();
    setUser(null);
  }, []);


  useEffect(() => {
    tokenStore.registerUnauthorizedHandler(() => {
      setUser(null);
    });
  }, []);


  useEffect(() => {
    (async () => {
      try {
        const { data } = await authApi.refresh();
        tokenStore.setAccessToken(data.data.accessToken);
        setUser(data.data.user);
      } catch {
        clearSession();
      } finally {
        setIsLoading(false);
      }
    })();
  }, [clearSession]);

  const signup = useCallback(async (payload) => {
    const { data } = await authApi.signup(payload);
    tokenStore.setAccessToken(data.data.accessToken);
    setUser(data.data.user);
    return data.data.user;
  }, []);

  const login = useCallback(async (payload) => {
    const { data } = await authApi.login(payload);
    tokenStore.setAccessToken(data.data.accessToken);
    setUser(data.data.user);
    return data.data.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
