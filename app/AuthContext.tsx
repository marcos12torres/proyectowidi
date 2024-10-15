import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './auth/firebase'; // Asegúrate de que el path sea correcto

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe; // Clean up the subscription
  }, []);

  const loginWithGoogle = async () => {
    // Implement Google login
  };

  const loginWithEmail = async (email: string, password: string) => {
    // Implement login with email
  };

  const logout = async () => {
    // Implement logout
  };

  const value = { user, loading, loginWithGoogle, loginWithEmail, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
