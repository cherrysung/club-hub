import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../providers/userProvider';
import ProfileButton from '../components/base/ProfileButton';
import { useAuth } from '../providers/authProvider';
import ClubList from '../components/home/ClubList';
import ClubFilters from '../components/home/ClubFilters';
import { useClubs } from '../providers/clubsProvider';
import { FilterList } from '@mui/icons-material';
import { updateFavorites } from '../lib/firebase/firestore';

function Home() {
  const { auth } = useAuth();
  const { user } = useUser();
  const { clubs } = useClubs();
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showRecommends, setShowRecommends] = useState(false);

  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  const handleFavorite = async (clubId) => {
    const isInFavorite = user.favorites.includes(clubId);

    try {
      await updateFavorites(auth.uid, clubId, isInFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectCategory = (value) => {
    const isSelected = selectedCategories.includes(value);

    if (isSelected) {
      // remove
      const filtered = selectedCategories.filter(
        (category) => category !== value
      );
      setSelectedCategories(filtered);
    } else {
      //  add
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const filteredData = useMemo(() => {
    let filteredClubs = clubs;

    if (selectedCategories.length > 0) {
      filteredClubs = filteredClubs.filter((item) => {
        return (
          selectedCategories.includes(item.cas_requirements) ||
          selectedCategories.includes(item.type_of_activity)
        );
      });
    }

    if (showRecommends && user?.recommendations?.clubIds) {
      filteredClubs = filteredClubs.filter((item) =>
        user.recommendations.clubIds.includes(item.clubId)
      );
    }

    return filteredClubs;
  }, [clubs, selectedCategories, showRecommends, user]);

  return (
    <Container maxWidth='md' sx={{ minHeight: '100vh' }}>
      <Box sx={{ mt: 4, mb: 6 }}>
        {user && (
          <Box display='flex' alignItems='center' gap={2} mb={4}>
            <Typography variant='h5'>
              Hey, {user.firstName} {user.lastName}
            </Typography>
            <ProfileButton />
          </Box>
        )}
        <ClubFilters
          onSelectCategory={handleSelectCategory}
          selectedCategories={selectedCategories}
        />
        <Box display='flex' justifyContent='end' mb={1}>
          <Button
            size='small'
            endIcon={<FilterList />}
            variant={showRecommends ? 'contained' : 'text'}
            onClick={() => setShowRecommends(!showRecommends)}
          >
            Recommend
          </Button>
        </Box>
        <ClubList
          clubData={filteredData}
          onFavorite={handleFavorite}
          user={user}
        />
      </Box>
    </Container>
  );
}

export default Home;
