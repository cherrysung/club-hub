import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Details from '../components/ClubDetail/Details';
import Forum from '../components/ClubDetail/Forum';
import { useClubs } from '../providers/clubsProvider';

function ClubDetail() {
  const { clubs } = useClubs();
  const param = useParams();
  const club = clubs.find((club) => club.clubId === param.clubId);

  return (
    <Container>
      <Box sx={{ mt: 4, pb: 10 }}>
        {club && (
          <>
            <Details club={club} />
            <Forum />
          </>
        )}
      </Box>
    </Container>
  );
}

export default ClubDetail;
