import { collection, getDocs, getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../lib/firebase/init";

/**
 * The `clubsProvider` contains all `club` documents from Firestore
 * It is used throughout the app for club data
 * It also contains the `setInvokeFetchClubs` method to invoke data fetching on demand
 */
const firestore = getFirestore(app);

export const ClubsContext = createContext({
  clubs: [],
  setInvokeFetchClubs: null,
});

export const useClubs = () => useContext(ClubsContext);

export const ClubsProvider = ({ children }) => {
  const [clubs, setClubs] = useState([]);
  const [invokeFetchClubs, setInvokeFetchClubs] = useState(true);

  useEffect(() => {
    const clubsColRef = collection(firestore, "clubs");

    const fetchClubs = async () => {
      if (!invokeFetchClubs) return;

      const clubs = [];
      try {
        const querySnapshot = await getDocs(clubsColRef);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          clubs.push({
            ...data,
            clubId: doc.id,
          });
        });

        clubs.sort((a, b) => a.club_name.localeCompare(b.club_name));

        setClubs(clubs);
        setInvokeFetchClubs(false);
      } catch (error) {
        console.error("Failed to fetch clubs: ", error);
      }
    };

    fetchClubs();
  }, [invokeFetchClubs]);

  return (
    <ClubsContext.Provider value={{ clubs, setInvokeFetchClubs }}>
      {children}
    </ClubsContext.Provider>
  );
};
