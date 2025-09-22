'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, AuthToken, loginUser, signupUser, getUserFromToken, getStoredToken, removeStoredToken, storeToken } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    // Return a default context instead of throwing if that's causing issues
    return {
      user: null,
      loading: false,
      isAuthenticated: false,
      login: async () => ({ success: false, error: 'AuthProvider not initialized' }),
      signup: async () => ({ success: false, error: 'AuthProvider not initialized' }),
      logout: async () => {}
    };
  }
  
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Initialize auth state
  const initializeAuth = useCallback(async () => {
    try {
      setLoading(true);
      const token = getStoredToken();
      
      if (token) {
        const userData = await getUserFromToken(token);
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          // Invalid or expired token
          removeStoredToken();
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      removeStoredToken();
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Check for existing token on app load
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    console.log('AuthContext login called with:', { email, hasPassword: !!password });
    
    try {
      // Basic validation
      if (!email || !password) {
        console.log('Missing email or password');
        return { success: false, error: 'Email and password are required' };
      }
      
      // Email format validation
      if (!/\S+@\S+\.\S+/.test(email)) {
        console.log('Invalid email format');
        return { success: false, error: 'Please enter a valid email address' };
      }

      setLoading(true);
      console.log('Calling loginUser...');
      const result = await loginUser(email, password);
      console.log('loginUser result:', result);
      
      if (result) {
        console.log('Login successful, storing token...');
        storeToken(result.token);
        setUser(result.user);
        setIsAuthenticated(true);
        console.log('Auth state updated, returning success');
        return { success: true };
      } else {
        console.log('Login failed: Invalid email or password');
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error: any) {
      console.error('Login error:', {
        name: error?.name,
        message: error?.message,
        stack: error?.stack,
        error: error
      });
      return { 
        success: false, 
        error: error?.message || 'An error occurred during login' 
      };
    } finally {
      console.log('Login process completed');
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!email || !password || !name) {
        return { success: false, error: 'All fields are required' };
      }

      // Basic email validation
      if (!/\S+@\S+\.\S+/.test(email)) {
        return { success: false, error: 'Please enter a valid email address' };
      }

      // Password strength check
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters long' };
      }

      setLoading(true);
      const result = await signupUser(email, password, name);
      
      if (result) {
        storeToken(result.token);
        setUser(result.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: 'Failed to create account' };
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      const errorMessage = error?.response?.data?.message || error.message || 'An error occurred during signup';
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      // If you have an API endpoint for logout, call it here
      // await api.logout();
      
      // Clear local storage and state
      removeStoredToken();
      setUser(null);
      setIsAuthenticated(false);
      
      // Optional: Redirect to home or login page
      // window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = React.useMemo(() => ({
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: Boolean(user && user.id),
  }), [user, loading, login, signup, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
