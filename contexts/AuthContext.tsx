import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from 'firebase/auth';
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import type { AppUserData } from '../types';
import { ADMIN_EMAIL } from '../constants';
import { auth, db } from '../firebase/config';

interface AuthContextValue {
  currentUser: User | null;
  userData: AppUserData | null;
  isAdmin: boolean;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  reloadUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const getUserData = async (uid: string) => {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    return null;
  }
  return snap.data() as AppUserData;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<AppUserData | null>(null);
  const [loading, setLoading] = useState(true);

  const syncUserData = useCallback(async (user: User) => {
    const data = await getUserData(user.uid);
    if (!data) {
      setUserData(null);
      return;
    }

    const isAdminEmail = normalizeEmail(user.email ?? '') === ADMIN_EMAIL;
    if (isAdminEmail && data.role !== 'admin') {
      await updateDoc(doc(db, 'users', user.uid), { role: 'admin' });
      setUserData({ ...data, role: 'admin' });
      return;
    }

    setUserData(data);
  }, []);

  const reloadUserData = useCallback(async () => {
    if (!currentUser) {
      setUserData(null);
      return;
    }
    await syncUserData(currentUser);
  }, [currentUser, syncUserData]);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe: (() => void) | undefined;

    const bootAuth = async () => {
      await setPersistence(auth, browserLocalPersistence);

      unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!isMounted) {
          return;
        }

        setCurrentUser(user);

        if (!user) {
          setUserData(null);
          setLoading(false);
          return;
        }

        try {
          await syncUserData(user);
        } finally {
          setLoading(false);
        }
      });
    };

    bootAuth().catch(() => {
      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [syncUserData]);

  const loginWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    await signInWithPopup(auth, provider);
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      userData,
      isAdmin: userData?.role === 'admin',
      loading,
      loginWithGoogle,
      logout,
      reloadUserData,
    }),
    [currentUser, userData, loading, loginWithGoogle, logout, reloadUserData],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
