import { useParams } from 'react-router-dom';
import mockData from '../lib/mock.json';
import { Box, Container } from '@mui/material';
import Details from '../components/ClubDetail/Details';
import Forum from '../components/ClubDetail/Forum';

function ClubDetail() {
  const param = useParams();
  const club = mockData.find((club) => club.clubId === param.clubId);

  return (
    <Container>
      <Box sx={{ mt: 4, pb: 10 }}>
        {club && (
          <>
            <Details club={club} />
            <Forum clubId={club.clubId} />
          </>
        )}
      </Box>
    </Container>
  );
}

export default ClubDetail;
