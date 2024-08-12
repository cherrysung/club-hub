import { Container } from '@mui/material';
import { useUser } from '../providers/userProvider';
import MyInfo from '../components/profile/MyInfo';
import MyRecommendations from '../components/profile/MyRecommendations';
import MyFavorites from '../components/profile/MyFavorites';
import { useNavigate } from 'react-router-dom';
import { useClubs } from '../providers/clubsProvider';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../providers/authProvider';
import { updateFavorites } from '../lib/firebase/firestore';

function Profile() {
  const navigate = useNavigate();
  const { auth, signout } = useAuth();
  const { user } = useUser();
  const { clubs } = useClubs();
  const [recommendedClubs, setRecommendedClubs] = useState([]);
  const [favoriteClubs, setFavoriteclubs] = useState([]);

  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  const getRecommendedClubs = useCallback(() => {
    if (!user) return;

    let recommendedClubs = [];
    const clubIds = user.recommendations?.clubIds;

    if (clubIds && clubIds.length > 0) {
      recommendedClubs = clubIds
        .map((id) => clubs.find((club) => club.clubId === id))
        .filter(Boolean)
        .sort((a, b) => {
          const aName = a?.club_name ?? '';
          const bName = b?.club_name ?? '';
          return aName.localeCompare(bName);
        });
    }

    return recommendedClubs;
  }, [clubs, user]);

  const getFavorites = useCallback(() => {
    if (!user) return;

    let favoriteClubs = [];
    const clubIds = user.favorites;

    if (clubIds.length > 0) {
      favoriteClubs = clubIds
        .map((id) => clubs.find((club) => club.clubId === id))
        .filter(Boolean)
        .sort((a, b) => {
          const aName = a?.club_name ?? '';
          const bName = b?.club_name ?? '';
          return aName.localeCompare(bName);
        });
    }

    return favoriteClubs;
  }, [clubs, user]);

  const goToClub = (clubId) => {
    navigate(`/club/${clubId}`);
  };

  const goToSurvey = () => {
    navigate('/recommend');
  };

  const handleUnfavorite = async (clubId) => {
    if (!auth) return;

    try {
      await updateFavorites(auth.uid, clubId, true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const recommendedClubs = getRecommendedClubs();
    setRecommendedClubs(recommendedClubs);
  }, [getRecommendedClubs]);

  useEffect(() => {
    const favoriteClubs = getFavorites();
    setFavoriteclubs(favoriteClubs);
  }, [getFavorites]);

  return (
    <Container maxWidth='md' sx={{ mb: 12 }}>
      <MyInfo user={user} onSignout={signout} />

      <MyRecommendations
        onNavigate={goToClub}
        onTakeSurvey={goToSurvey}
        recommendations={recommendedClubs}
      />

      <MyFavorites
        onNavigate={goToClub}
        favorites={favoriteClubs}
        onUnfavorite={handleUnfavorite}
      />
    </Container>
  );
}

export default Profile;
