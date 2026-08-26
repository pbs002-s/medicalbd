import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../mockData';

interface AuthContextType {
  currentUser: User | null;
  activeRole: UserRole;
  isAuthenticated: boolean;
  switchRole: (role: UserRole) => void;
  login: (identifier: string, role?: UserRole) => void;
  register: (user: Partial<User>) => void;
  logout: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (open: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<UserRole>(() => {
    return (localStorage.getItem('shasthosetu_role') as UserRole) || 'patient';
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedRole = (localStorage.getItem('shasthosetu_role') as UserRole) || 'patient';
    return mockUsers[savedRole] || mockUsers.patient;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard', 'landing', 'appointments', 'live_serial', etc.

  useEffect(() => {
    localStorage.setItem('shasthosetu_role', activeRole);
  }, [activeRole]);

  const switchRole = (role: UserRole) => {
    setActiveRole(role);
    setCurrentUser(mockUsers[role] || mockUsers.patient);
    setActiveView('dashboard');
  };

  const login = (identifier: string, role: UserRole = 'patient') => {
    setActiveRole(role);
    setCurrentUser(mockUsers[role] || mockUsers.patient);
    setIsLoginModalOpen(false);
    setActiveView('dashboard');
  };

  const register = (newUser: Partial<User>) => {
    const role = newUser.role || 'patient';
    setActiveRole(role);
    const createdUser: User = {
      id: `usr_${Date.now()}`,
      name: newUser.name || 'User',
      nameBn: newUser.nameBn || 'ব্যবহারকারী',
      email: newUser.email || 'user@example.com',
      phone: newUser.phone || '01700000000',
      role: role,
      avatar: newUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      ...newUser
    };
    setCurrentUser(createdUser);
    setIsRegisterModalOpen(false);
    setActiveView('dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveView('landing');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        activeRole,
        isAuthenticated: !!currentUser,
        switchRole,
        login,
        register,
        logout,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isRegisterModalOpen,
        setIsRegisterModalOpen,
        activeView,
        setActiveView
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
