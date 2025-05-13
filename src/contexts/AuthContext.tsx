
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Role } from '../types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: Role) => Promise<void>;
  registerLawyer: (data: LawyerRegistrationData) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface LawyerRegistrationData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  contact_number: string;
  city: string;
  address: string;
  experience: number;
  domain: string;
  law_school: string;
  bar_association: string;
  total_cases: number;
  cases_won: number;
  fees_per_hearing: number;
  rating?: number;
  role: Role;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  registerLawyer: async () => {},
  isAuthenticated: false,
  loading: false
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would validate credentials against a backend
    // For demo purposes, we'll just simulate a successful login
    
    setLoading(true);
    
    try {
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
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (name: string, email: string, password: string, role: Role = "user") => {
    // In a real app, this would send registration data to a backend
    // For demo purposes, we'll just simulate a successful registration
    
    setLoading(true);
    
    try {
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
    } finally {
      setLoading(false);
    }
  };

  const registerLawyer = async (data: LawyerRegistrationData) => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: `${data.first_name} ${data.last_name}`,
        email: data.email,
        role: "lawyer",
        profileImage: `https://api.dicebear.com/7.x/personas/svg?seed=${data.first_name}${data.email}`,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // In a real app, we would save all the lawyer data to the database
      console.log("Lawyer registered with data:", data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register,
      registerLawyer,
      isAuthenticated: !!user,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
