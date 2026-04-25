'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type TabType = 'login' | 'signup' | 'verification' | 'reset-password';

interface AuthContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  // Login State
  loginForm: { identifier: string; password: string };
  setLoginForm: React.Dispatch<
    React.SetStateAction<{ identifier: string; password: string }>
  >;
  // Signup State
  signupForm: {
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    confirmPassword: string;
    agreeToTerms: boolean;
    post: string;
  };
  setSignupForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      password: string;
      mobileNo: string;
      confirmPassword: string;
      agreeToTerms: boolean;
      post: string;
    }>
  >;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<TabType>('login');

  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    mobileNo: '',
    confirmPassword: '',
    agreeToTerms: false,
    post: '',
  });

  return (
    <AuthContext.Provider
      value={{
        activeTab,
        setActiveTab,
        loginForm,
        setLoginForm,
        signupForm,
        setSignupForm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
