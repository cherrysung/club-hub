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
import { createContext, useState } from 'react';
import { app } from '../lib/firebase/init';

const AuthContext = createContext({
  auth: null,
  signInWithGoogle: async () => {},
  signout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(firebaseAuth, provider);
      const userAdditionalInfo = getAdditionalUserInfo(userCredential);
      const user = userCredential.user;
      if (user && userAdditionalInfo) {
        // TODO: Create new user doc in firestore
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
