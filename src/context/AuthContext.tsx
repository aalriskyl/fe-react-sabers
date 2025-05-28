/* eslint-disable react-refresh/only-export-components */
// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import api, { setLogoutFunction } from "../app/api/axios";
import axios  from "axios";
import {
  User,
  AuthContextType,
  AuthProviderProps,
  RouteProps,
  PublicRouteProps
} from "../app/types/models/AuthContext.types";


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    setLoading(true);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setIsAuthenticated(false);
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    setLogoutFunction(logout);
  }, [logout]);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken) {
          setToken(storedToken);
          setIsAuthenticated(true);

          if (storedUser) {
            try {
              setUser(JSON.parse(storedUser));
            } catch (error) {
              console.error("Failed to parse user data", error);
              localStorage.removeItem("user");
            }
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        setError("Failed to restore authentication state");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.post<{ token: string; user: User }>("/api/login", { email, password });
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setToken(token);
        setUser(user);
        setIsAuthenticated(true);

        navigate("/admin/dashboard");
      } catch (err) {
        let errorMessage = "Login failed";
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        console.error("Login error:", err);
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const updateUser = useCallback((userData: User) => {
    setLoading(true);
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      console.error("Update user error:", err);
      setError("Failed to update user information");
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const contextValue: AuthContextType = {
    isAuthenticated,
    token,
    user,
    loading,
    error,
    login,
    logout,
    setUser: updateUser,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


export const PrivateRoute: React.FC<RouteProps> = ({
  children,
  redirectTo = "/login",
}) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading authentication status...</div>;
  }

  const storedToken = localStorage.getItem('token');
  const redirectPath = redirectTo || '/';

  if (!isAuthenticated || !storedToken) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectPath = "/admin/dashboard",
}) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading authentication status...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};