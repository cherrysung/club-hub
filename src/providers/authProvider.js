/**
 * The `authProvider` contains the `auth` object from Firebase Authentication
 * It is used to check whether user is authenticated upon entering certain pages
 * It also contains signin/out methods to keep all authentication logic in one place
 */

import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { app } from '../lib/firebase/init';
import { setUserDoc } from '../lib/firebase/firestore';

export const AuthContext = createContext({
  auth: null,
  signInWithGoogle: async () => {},
  signout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (user) => {
      setAuth(user);
    });

    return unsub;
  }, [firebaseAuth]);

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(firebaseAuth, provider);
      const userAdditionalInfo = getAdditionalUserInfo(userCredential);
      const user = userCredential.user;

      if (user && userAdditionalInfo) {
        if (userAdditionalInfo.isNewUser) {
          await setUserDoc(user.uid, user.email);
          return true;
        }
      }

      setAuth(user);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signout = async () => {
    try {
      await signOut(firebaseAuth);
      setAuth(null);
    } catch (error) {
      console.error('Failed to sign out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ auth, signInWithGoogle, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
