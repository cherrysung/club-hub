/**
 * The `authProvider` contains the `auth` object from Firebase Authentication
 * It is used to check whether user is authenticated upon entering certain pages
 * It also contains signin/out methods to keep all authentication logic in one place
 */

import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { createContext, useContext, useState } from 'react';
import { app } from '../lib/firebase/init';
import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';

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
  const firestore = getFirestore(app);

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(firebaseAuth, provider);
      const userAdditionalInfo = getAdditionalUserInfo(userCredential);
      const user = userCredential.user;
      if (user && userAdditionalInfo) {
        setAuth(user);
        if (userAdditionalInfo.isNewUser) {
          const userRef = doc(firestore, 'users', user.uid);
          await setDoc(userRef, {
            email: user.email,
            createdAt: serverTimestamp(),
          });
          return true;
        }
      }
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
