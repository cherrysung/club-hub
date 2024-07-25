import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClubItem from './ClubItem';

function ClubList({ clubData, onFavorite, user }) {
  const navigate = useNavigate();

  const handleSeeClub = (clubId) => {
    navigate(`/club/${clubId}`);
  };

  return (
    <Grid container spacing={2} columns={{ xs: 1, sm: 8, md: 12 }}>
      {clubData.map((club) => (
        <ClubItem
          key={club.clubId}
          onSeeClub={handleSeeClub}
          onFavorite={onFavorite}
          isFavorite={user ? user.favorites?.includes(club.clubId) : false}
          isRecommend={
            user ? user.recommendations?.clubIds?.includes(club.clubId) : false
          }
          club={club}
        />
      ))}
    </Grid>
  );
}

export default ClubList;
