import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { app } from '../lib/firebase/init';

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

const getCurrentSemester = () => {
  const now = new Date();
  const year = now.getFullYear();
  /**
   * Semester 1: May 14 ~ Dec 3
   * Semester 2: Dec 4 ~ May 13
   */
  const sem1Start = new Date(year, 4, 14); // May 14
  const sem1End = new Date(year, 11, 3); // Dec 3

  if (now >= sem1Start && now <= sem1End) {
    return true;
  } else {
    return false;
  }
};

export const ClubsProvider = ({ children }) => {
  const [clubs, setClubs] = useState([]);
  const [invokeFetchClubs, setInvokeFetchClubs] = useState(true);

  useEffect(() => {
    const clubsColRef = collection(firestore, 'clubs');

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

        const isSem1 = getCurrentSemester();

        const filteredClubs = clubs.filter((club) => {
          const { semesters } = club;
          if (
            semesters === 'Both, optional' ||
            semesters === 'Both, mandatory'
          ) {
            return true;
          }
          if (semesters === 'Sem 1 only' && isSem1) {
            return true;
          }
          if (semesters === 'Sem 2 only' && !isSem1) {
            return true;
          }
          return false;
        });

        filteredClubs.sort((a, b) => a.club_name.localeCompare(b.club_name));

        setClubs(filteredClubs);
        setInvokeFetchClubs(false);
      } catch (error) {
        console.error('Failed to fetch clubs: ', error);
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
