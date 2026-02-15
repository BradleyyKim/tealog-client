import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { AuthUser, LoginResponse } from '@/types';
import { API_URL, JWT_KEY, USER_KEY } from '@/lib/constants';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(JWT_KEY),
  );
  const [isReady, setIsReady] = useState(() => {
    const t = localStorage.getItem(JWT_KEY);
    if (!t) return true; // no token → ready immediately
    const u = localStorage.getItem(USER_KEY);
    return !!u; // user restored from localStorage → ready immediately
  });

  useEffect(() => {
    if (token && !user) {
      fetch(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) => {
          setUser(data);
          localStorage.setItem(USER_KEY, JSON.stringify(data));
        })
        .catch(() => {
          setToken(null);
          setUser(null);
          localStorage.removeItem(JWT_KEY);
          localStorage.removeItem(USER_KEY);
        })
        .finally(() => {
          setIsReady(true);
        });
    }
  }, [token, user]);

  const login = useCallback(async (identifier: string, password: string) => {
    const res = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.error?.message || 'Login failed');
    }

    const data: LoginResponse = await res.json();
    localStorage.setItem(JWT_KEY, data.jwt);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setToken(data.jwt);
    setUser(data.user);
  }, []);

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      const res = await fetch(`${API_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error?.message || 'Registration failed');
      }

      const data: LoginResponse = await res.json();
      localStorage.setItem(JWT_KEY, data.jwt);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setToken(data.jwt);
      setUser(data.user);
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(JWT_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
    qc.clear();
  }, [qc]);

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!token, isReady, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
