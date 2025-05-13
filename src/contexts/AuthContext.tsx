import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export type Role = "user" | "lawyer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  profileImage: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  registerLawyer: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // Mock authentication for demo purposes
      if (email && password) {
        // Check if it's a registered lawyer or user (mock)
        const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const savedLawyers = JSON.parse(localStorage.getItem("lawyers") || "[]");
        
        const foundUser = [...savedUsers, ...savedLawyers].find(
          u => u.email === email && u.password === password
        );

        if (foundUser) {
          const userData = {
            id: foundUser.id,
            name: foundUser.name || `${foundUser.first_name} ${foundUser.last_name}`,
            email: foundUser.email,
            role: foundUser.role || "user",
            profileImage: foundUser.profileImage
          };
          
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          toast.success("Login successful!");
        } else {
          toast.error("Invalid email or password");
          throw new Error("Invalid email or password");
        }
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // Mock registration for demo purposes
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      
      if (existingUsers.some((u: any) => u.email === email)) {
        toast.error("User with this email already exists");
        throw new Error("User with this email already exists");
      }
      
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password, // In real app, this would be hashed
        role: "user",
        profileImage: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`
      };
      
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      
      // Auto-login after registration
      const userData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profileImage: newUser.profileImage
      };
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerLawyer = async (data: any) => {
    try {
      setLoading(true);
      // Mock lawyer registration for demo purposes
      const existingLawyers = JSON.parse(localStorage.getItem("lawyers") || "[]");
      
      if (existingLawyers.some((l: any) => l.email === data.email)) {
        toast.error("Lawyer with this email already exists");
        throw new Error("Lawyer with this email already exists");
      }
      
      const newLawyer = {
        id: `lawyer-${Date.now()}`,
        ...data,
        role: "lawyer",
        profileImage: `https://api.dicebear.com/7.x/initials/svg?seed=${data.first_name}${data.last_name}`
      };
      
      existingLawyers.push(newLawyer);
      localStorage.setItem("lawyers", JSON.stringify(existingLawyers));
      
      // Auto-login after registration
      const userData = {
        id: newLawyer.id,
        name: `${newLawyer.first_name} ${newLawyer.last_name}`,
        email: newLawyer.email,
        role: newLawyer.role,
        profileImage: newLawyer.profileImage
      };
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Lawyer registration successful!");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  const value = {
    user,
    loading,
    login,
    register,
    registerLawyer,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
