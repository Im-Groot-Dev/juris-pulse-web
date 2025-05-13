
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Role } from '../types/user';
import { toast } from "sonner";

// Define interfaces for user profiles
interface UserProfile {
  appointments: AppointmentData[];
  savedLawyers: string[];
}

export interface AppointmentData {
  id: string;
  lawyerId: string;
  lawyerName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  domain: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: Role) => Promise<void>;
  registerLawyer: (data: LawyerRegistrationData) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  scheduleAppointment: (appointmentData: Omit<AppointmentData, 'id'>) => Promise<void>;
  cancelAppointment: (appointmentId: string) => Promise<void>;
  saveLawyer: (lawyerId: string) => void;
  unsaveLawyer: (lawyerId: string) => void;
  getUserAppointments: () => AppointmentData[];
  getSavedLawyers: () => string[];
  hasScheduledAppointment: (lawyerId: string) => boolean;
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
  bio?: string;
  profileImage?: string;
}

interface LawyerProfile extends LawyerRegistrationData {
  id: string;
  appointments: AppointmentData[];
  clients: string[];
  reviews: {
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

// Create a context to store lawyer profiles for demo purposes
const LawyerProfiles: Record<string, LawyerProfile> = {};
const UserProfiles: Record<string, UserProfile> = {};
const RegisteredUsers: Record<string, {password: string, role: Role, name: string, id: string}> = {};

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  registerLawyer: async () => {},
  isAuthenticated: false,
  loading: false,
  scheduleAppointment: async () => {},
  cancelAppointment: async () => {},
  saveLawyer: () => {},
  unsaveLawyer: () => {},
  getUserAppointments: () => [],
  getSavedLawyers: () => [],
  hasScheduledAppointment: () => false
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load registered users from localStorage on mount
  useEffect(() => {
    const storedRegisteredUsers = localStorage.getItem('registeredUsers');
    if (storedRegisteredUsers) {
      try {
        const parsedUsers = JSON.parse(storedRegisteredUsers);
        Object.assign(RegisteredUsers, parsedUsers);
      } catch (error) {
        console.error('Failed to parse registered users from localStorage:', error);
      }
    }
    
    // Check for existing user session in localStorage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // Load user profile if exists
        const storedProfile = localStorage.getItem(`profile_${parsedUser.id}`);
        if (storedProfile) {
          setUserProfile(JSON.parse(storedProfile));
        } else {
          // Initialize empty profile for existing users
          const newProfile: UserProfile = {
            appointments: [],
            savedLawyers: []
          };
          setUserProfile(newProfile);
          localStorage.setItem(`profile_${parsedUser.id}`, JSON.stringify(newProfile));
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Validate credentials against registered users
      if (!RegisteredUsers[email] || RegisteredUsers[email].password !== password) {
        throw new Error("Invalid email or password");
      }
      
      // Get user data from registration info
      const userData = RegisteredUsers[email];
      
      const mockUser: User = {
        id: userData.id,
        name: userData.name,
        email,
        role: userData.role,
        profileImage: `https://api.dicebear.com/7.x/personas/svg?seed=${email}`,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Load or initialize user profile
      const storedProfile = localStorage.getItem(`profile_${mockUser.id}`);
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
      } else {
        const newProfile: UserProfile = {
          appointments: [],
          savedLawyers: []
        };
        setUserProfile(newProfile);
        localStorage.setItem(`profile_${mockUser.id}`, JSON.stringify(newProfile));
      }
      
      toast.success("Login successful");
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(error.message || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setUserProfile(null);
    // Keep the registered users data but remove current session
    localStorage.removeItem('user');
    toast.info("Logged out successfully");
  };

  const register = async (name: string, email: string, password: string, role: Role = "user") => {
    setLoading(true);
    
    try {
      // Check if user already exists
      if (RegisteredUsers[email]) {
        throw new Error("User with this email already exists");
      }
      
      // Create new user ID
      const userId = email.replace(/[^a-zA-Z0-9]/g, '');
      
      // Register the new user
      RegisteredUsers[email] = {
        password,
        role,
        name,
        id: userId
      };
      
      // Save to localStorage for persistence
      localStorage.setItem('registeredUsers', JSON.stringify(RegisteredUsers));
      
      const mockUser: User = {
        id: userId,
        name,
        email,
        role,
        profileImage: `https://api.dicebear.com/7.x/personas/svg?seed=${name}${email}`,
      };
      
      // Create empty profile for new user
      const newProfile: UserProfile = {
        appointments: [],
        savedLawyers: []
      };
      
      // Save user and profile
      setUser(mockUser);
      setUserProfile(newProfile);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem(`profile_${userId}`, JSON.stringify(newProfile));
      
      toast.success("Registration successful");
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast.error(error.message || "Registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerLawyer = async (data: LawyerRegistrationData) => {
    setLoading(true);
    
    try {
      // Check if user already exists
      if (RegisteredUsers[data.email]) {
        throw new Error("User with this email already exists");
      }
      
      // Create lawyer ID
      const lawyerId = data.email.replace(/[^a-zA-Z0-9]/g, '');
      
      // Register the lawyer in users
      RegisteredUsers[data.email] = {
        password: data.password,
        role: "lawyer",
        name: `${data.first_name} ${data.last_name}`,
        id: lawyerId
      };
      
      // Save to localStorage
      localStorage.setItem('registeredUsers', JSON.stringify(RegisteredUsers));
      
      const mockUser: User = {
        id: lawyerId,
        name: `${data.first_name} ${data.last_name}`,
        email: data.email,
        role: "lawyer",
        profileImage: data.profileImage || `https://api.dicebear.com/7.x/personas/svg?seed=${data.first_name}${data.email}`,
      };
      
      // Create lawyer profile
      const lawyerProfile: LawyerProfile = {
        ...data,
        id: lawyerId,
        appointments: [],
        clients: [],
        reviews: []
      };
      
      // Save lawyer profile
      LawyerProfiles[lawyerId] = lawyerProfile;
      localStorage.setItem(`lawyer_${lawyerId}`, JSON.stringify(lawyerProfile));
      
      // Create empty user profile for the lawyer
      const newProfile: UserProfile = {
        appointments: [],
        savedLawyers: []
      };
      
      setUser(mockUser);
      setUserProfile(newProfile);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem(`profile_${lawyerId}`, JSON.stringify(newProfile));
      
      toast.success("Lawyer registration successful");
    } catch (error: any) {
      console.error("Lawyer registration failed:", error);
      toast.error(error.message || "Registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const scheduleAppointment = async (appointmentData: Omit<AppointmentData, 'id'>) => {
    if (!user || !userProfile) {
      toast.error("You must be logged in to schedule appointments");
      throw new Error("User not authenticated");
    }
    
    setLoading(true);
    
    try {
      // Generate unique ID for appointment
      const appointmentId = `appt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const newAppointment: AppointmentData = {
        ...appointmentData,
        id: appointmentId
      };
      
      // Update user profile with new appointment
      const updatedProfile = {
        ...userProfile,
        appointments: [...userProfile.appointments, newAppointment]
      };
      
      setUserProfile(updatedProfile);
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
      
      // Update lawyer's appointments if the lawyer exists in our system
      const lawyerProfile = LawyerProfiles[appointmentData.lawyerId];
      if (lawyerProfile) {
        lawyerProfile.appointments.push(newAppointment);
        
        // Add client to lawyer's client list if not already there
        if (!lawyerProfile.clients.includes(user.id)) {
          lawyerProfile.clients.push(user.id);
        }
        
        localStorage.setItem(`lawyer_${appointmentData.lawyerId}`, JSON.stringify(lawyerProfile));
      }
      
      toast.success("Appointment scheduled successfully");
    } catch (error: any) {
      console.error("Failed to schedule appointment:", error);
      toast.error(error.message || "Failed to schedule appointment");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    if (!user || !userProfile) {
      toast.error("You must be logged in to cancel appointments");
      throw new Error("User not authenticated");
    }
    
    setLoading(true);
    
    try {
      // Find appointment
      const appointment = userProfile.appointments.find(appt => appt.id === appointmentId);
      
      if (!appointment) {
        throw new Error("Appointment not found");
      }
      
      // Update appointment status
      const updatedAppointments = userProfile.appointments.map(appt => 
        appt.id === appointmentId ? { ...appt, status: 'cancelled' as const } : appt
      );
      
      const updatedProfile = {
        ...userProfile,
        appointments: updatedAppointments
      };
      
      setUserProfile(updatedProfile);
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
      
      // Update lawyer's appointment record if exists
      const lawyerProfile = LawyerProfiles[appointment.lawyerId];
      if (lawyerProfile) {
        const updatedLawyerAppointments = lawyerProfile.appointments.map(appt => 
          appt.id === appointmentId ? { ...appt, status: 'cancelled' as const } : appt
        );
        
        lawyerProfile.appointments = updatedLawyerAppointments;
        localStorage.setItem(`lawyer_${appointment.lawyerId}`, JSON.stringify(lawyerProfile));
      }
      
      toast.success("Appointment cancelled successfully");
    } catch (error: any) {
      console.error("Failed to cancel appointment:", error);
      toast.error(error.message || "Failed to cancel appointment");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const saveLawyer = (lawyerId: string) => {
    if (!user || !userProfile) {
      toast.error("You must be logged in to save lawyers");
      return;
    }
    
    if (userProfile.savedLawyers.includes(lawyerId)) {
      toast.info("This lawyer is already saved");
      return;
    }
    
    const updatedProfile = {
      ...userProfile,
      savedLawyers: [...userProfile.savedLawyers, lawyerId]
    };
    
    setUserProfile(updatedProfile);
    localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
    
    toast.success("Lawyer saved to your profile");
  };

  const unsaveLawyer = (lawyerId: string) => {
    if (!user || !userProfile) {
      toast.error("You must be logged in to manage saved lawyers");
      return;
    }
    
    const updatedProfile = {
      ...userProfile,
      savedLawyers: userProfile.savedLawyers.filter(id => id !== lawyerId)
    };
    
    setUserProfile(updatedProfile);
    localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
    
    toast.success("Lawyer removed from saved list");
  };

  const getUserAppointments = () => {
    if (!userProfile) return [];
    return userProfile.appointments;
  };

  const getSavedLawyers = () => {
    if (!userProfile) return [];
    return userProfile.savedLawyers;
  };

  const hasScheduledAppointment = (lawyerId: string) => {
    if (!userProfile) return false;
    return userProfile.appointments.some(
      appt => appt.lawyerId === lawyerId && appt.status === 'scheduled'
    );
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userProfile,
      login, 
      logout, 
      register,
      registerLawyer,
      isAuthenticated: !!user,
      loading,
      scheduleAppointment,
      cancelAppointment,
      saveLawyer,
      unsaveLawyer,
      getUserAppointments,
      getSavedLawyers,
      hasScheduledAppointment
    }}>
      {children}
    </AuthContext.Provider>
  );
};
