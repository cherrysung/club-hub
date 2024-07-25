import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import HomeButton from '../components/base/HomeButton';
import { useUser } from '../providers/userProvider';
import MyRecommendations from '../components/profile/MyRecommendations';
import { useNavigate } from 'react-router-dom';
import { useClubs } from '../providers/clubsProvider';
import { useCallback, useEffect, useState } from 'react';

function formatDate(timestamp) {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function Profile() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { clubs } = useClubs();
  const [recommendedClubs, setRecommendedClubs] = useState([]);
  const favoriteClubs = ['11 Club', '12 Club', '13 Club', '14 Club'];

  const getRecommendedClubs = useCallback(() => {
    if (!user) return;

    let recommendedClubs = [];
    const clubIds = user.recommendations?.clubIds;

    if (clubIds && clubIds.length > 0) {
      recommendedClubs = clubIds
        .map((id) => clubs.find((club) => club.clubId === id))
        .sort((a, b) => {
          const aName = a?.club_name ?? '';
          const bName = b?.club_name ?? '';
          return aName.localeCompare(bName);
        });
    }

    return recommendedClubs;
  }, [clubs, user]);

  const goToClub = (clubId) => {
    navigate(`/club/${clubId}`);
  };

  const goToSurvey = () => {
    navigate('/recommend');
  };

  useEffect(() => {
    const recommendedClubs = getRecommendedClubs();
    setRecommendedClubs(recommendedClubs);
  }, [getRecommendedClubs]);

  return (
    <Container maxWidth='md'>
      <Box sx={{ my: 4 }}>
        <Box display='flex' width='100%' justifyContent='space-between'>
          <HomeButton />
          <Button variant='contained'>Sign out</Button>
        </Box>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography variant='h5'>My Info</Typography>
      </Box>
      {user && (
        <Grid container spacing={1} columns={2}>
          <Grid item xs={2} sm={1}>
            <Typography variant='body1' mt={1}>
              Name: {user.firstName} {user.lastName}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={1}>
            <Typography variant='body1' mt={1}>
              Member Since: {formatDate(user.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={1}>
            <Typography variant='body1' mt={1}>
              Grade: {user.grade}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={1}>
            <Typography variant='body1' mt={1}>
              Email: {user.email}
            </Typography>
          </Grid>
        </Grid>
      )}
      <MyRecommendations
        onNavigate={goToClub}
        onTakeSurvey={goToSurvey}
        recommendations={recommendedClubs}
      />
      <Box sx={{ mt: 2 }}>
        <Typography variant='h5'>My Favorites</Typography>
        <List>
          {favoriteClubs.map((club, index) => (
            <ListItem key={index}>
              <Typography variant='body1'>{club}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default Profile;
