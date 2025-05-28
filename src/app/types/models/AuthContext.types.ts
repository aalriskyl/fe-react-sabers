// src/context/AuthContext.types.ts
import { ReactNode } from "react";

export interface User {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  clearError: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface RouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export interface PublicRouteProps extends RouteProps {
  redirectPath?: string;
}