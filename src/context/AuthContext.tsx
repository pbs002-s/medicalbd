import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { AppView, User, UserRole } from '../types';
import { mockUsers } from '../mockData';
import { KEYS, readJson, writeJson } from '../lib/storage';
import { setAuthToken } from '../api/client';

/**
 * Demo accounts, so the four roles can be reviewed without a backend.
 *
 * ponytail: identifier-only sign-in with no password check. That is fine for a
 * seeded demo build and unacceptable in production — when the Laravel/Sanctum
 * backend lands, `login` posts credentials to /auth/login and stores the token
 * it returns; the map below becomes the offline fallback only.
 */
const DEMO_ACCOUNTS: Record<string, UserRole> = {
  'patient@demo.com': 'patient',
  'doctor@demo.com': 'doctor',
  'student@demo.com': 'student',
  'admin@demo.com': 'admin',
};

interface StoredSession {
  role: UserRole;
  user: User | null;
}

interface AuthContextType {
  currentUser: User | null;
  activeRole: UserRole;
  isAuthenticated: boolean;
  switchRole: (role: UserRole) => void;
  /** Resolves the role from a demo email when one is not given explicitly. */
  login: (identifier: string, role?: UserRole) => void;
  register: (user: Partial<User>) => void;
  logout: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (open: boolean) => void;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  /** Prescription the user drilled into, read by PrescriptionsPage. */
  selectedRxId?: string;
  openPrescription: (id?: string) => void;
  demoAccounts: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<StoredSession>(() => {
    const stored = readJson<StoredSession | null>(KEYS.session, null);
    if (stored?.role) return stored;
    return { role: 'patient', user: mockUsers.patient };
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  // A restored session with no user means the visitor logged out last time —
  // send them to the landing page rather than an empty dashboard.
  const [activeView, setActiveView] = useState<AppView>(() =>
    session.user ? 'dashboard' : 'landing'
  );
  const [selectedRxId, setSelectedRxId] = useState<string | undefined>();

  useEffect(() => writeJson(KEYS.session, session), [session]);

  const switchRole = useCallback((role: UserRole) => {
    setSession({ role, user: mockUsers[role] ?? mockUsers.patient });
    setActiveView('dashboard');
  }, []);

  const login = useCallback((identifier: string, role?: UserRole) => {
    const resolved = role ?? DEMO_ACCOUNTS[identifier.trim().toLowerCase()] ?? 'patient';
    setSession({ role: resolved, user: mockUsers[resolved] ?? mockUsers.patient });
    // No real token offline; the backend replaces this with the issued one.
    setAuthToken(null);
    setIsLoginModalOpen(false);
    setActiveView('dashboard');
  }, []);

  const register = useCallback((newUser: Partial<User>) => {
    const role = newUser.role ?? 'patient';
    const createdUser: User = {
      id: `usr_${Date.now()}`,
      name: newUser.name || 'User',
      nameBn: newUser.nameBn || 'ব্যবহারকারী',
      email: newUser.email || 'user@example.com',
      phone: newUser.phone || '01700000000',
      avatar:
        newUser.avatar ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      ...newUser,
      role,
    };
    setSession({ role, user: createdUser });
    setIsRegisterModalOpen(false);
    setActiveView('dashboard');
  }, []);

  const logout = useCallback(() => {
    setSession((prev) => ({ role: prev.role, user: null }));
    setAuthToken(null);
    setActiveView('landing');
  }, []);

  const openPrescription = useCallback((id?: string) => {
    setSelectedRxId(id);
    setActiveView('prescriptions');
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      currentUser: session.user,
      activeRole: session.role,
      isAuthenticated: Boolean(session.user),
      switchRole,
      login,
      register,
      logout,
      isLoginModalOpen,
      setIsLoginModalOpen,
      isRegisterModalOpen,
      setIsRegisterModalOpen,
      activeView,
      setActiveView,
      selectedRxId,
      openPrescription,
      demoAccounts: Object.keys(DEMO_ACCOUNTS),
    }),
    [session, isLoginModalOpen, isRegisterModalOpen, activeView, selectedRxId, switchRole, login, register, logout, openPrescription]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
