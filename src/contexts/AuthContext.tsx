
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Role } from '../types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: Role) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  isAuthenticated: false
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing user session in localStorage on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would validate credentials against a backend
    // For demo purposes, we'll just simulate a successful login
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if it's a user or lawyer login based on email
    let role: Role = "user";
    if (email.includes('lawyer')) {
      role = "lawyer";
    }
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role,
      profileImage: `https://api.dicebear.com/7.x/personas/svg?seed=${email}`,
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (name: string, email: string, password: string, role: Role) => {
    // In a real app, this would send registration data to a backend
    // For demo purposes, we'll just simulate a successful registration
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      profileImage: `https://api.dicebear.com/7.x/personas/svg?seed=${name}${email}`,
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
