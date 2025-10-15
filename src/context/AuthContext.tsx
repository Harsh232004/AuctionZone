import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { decodeJwt, getToken, isTokenExpired, saveToken, clearToken } from '../api/auth';

type DecodedToken = {
  sub?: string;
  username?: string;
  email?: string;
  roles?: string[];   // Add roles from your backend JWT
  exp?: number;
};

type User = {
  id: number;
  username: string;
  email: string;
  roles: string[];
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  hasRole: (role: string) => boolean;
  setSession: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Initialize auth state from stored token
  useEffect(() => {
    const t = getToken();
    if (!t) return;

    if (isTokenExpired(t)) {
      clearToken();
      return;
    }

    setToken(t);
    const decoded = decodeJwt<DecodedToken>(t);
    if (decoded) {
      setUser({
        id: Number(decoded.sub),
        username: decoded.username || '',
        email: decoded.email || '',
        roles: decoded.roles || [],
      });
    }
  }, []);

  // Auto logout if token expires
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      if (token && isTokenExpired(token)) {
        clearToken();
        setToken(null);
        setUser(null);
      }
    }, 60_000);

    return () => clearInterval(interval);
  }, [token]);

  const setSession = (t: string) => {
    saveToken(t);
    setToken(t);
    const decoded = decodeJwt<DecodedToken>(t);
    setUser(
      decoded
        ? {
            id: Number(decoded.sub),
            username: decoded.username || '',
            email: decoded.email || '',
            roles: decoded.roles || [],
          }
        : null
    );
  };

  const logout = () => {
    clearToken();
    setToken(null);
    setUser(null);
  };

  const hasRole = (role: string): boolean => {
    return user?.roles?.includes(role) ?? false;
  };

  const value = useMemo(
    () => ({ isAuthenticated: !!token, user, token, hasRole, setSession, logout }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
