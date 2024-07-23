import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authProvider";
import { app } from "../lib/firebase/init";

export const UserContext = createContext({
  user: null,
});

export const useUser = () => useContext(UserContext);

const TEMP_UID = "wC1lMegX6UMxuPS3QvpINrebxrn1";

export const UserProvider = ({ children }) => {
  const { auth } = useAuth();
  const [user, setUser] = useState(null);

  const firestore = getFirestore(app);

  useEffect(() => {
    const userRef = doc(firestore, "users", TEMP_UID);

    const unsub = onSnapshot(
      userRef,
      async (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUser(userData);
        }
      },
      (error) => {
        console.error("Error listening to user document: ", error);
      }
    );
    return unsub;
  }, [firestore]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
