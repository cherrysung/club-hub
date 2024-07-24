import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClubItem from './ClubItem';

function ClubList({ clubData }) {
  const navigate = useNavigate();

  const handleSeeClub = (clubId) => {
    navigate(`/club/${clubId}`);
  };

  return (
    <Grid container spacing={2} columns={{ xs: 1, sm: 8, md: 12 }}>
      {clubData.map((club) => (
        <ClubItem onSeeClub={handleSeeClub} club={club} key={club.clubId} />
      ))}
    </Grid>
  );
}

export default ClubList;
