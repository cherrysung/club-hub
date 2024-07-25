import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Details from '../components/ClubDetail/Details';
import Forum from '../components/ClubDetail/Forum';
import { useClubs } from '../providers/clubsProvider';
import { useAuth } from '../providers/authProvider';
import { useEffect, useState } from 'react';

function ClubDetail() {
  const { auth } = useAuth();
  const { clubs, setInvokeFetchClubs } = useClubs();
  const param = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState();
  const [isLeader, setLeader] = useState(null);

  useEffect(() => {
    if (!auth) {
      navigate('/');
    } else {
      const club = clubs.find((club) => club.clubId === param.clubId);
      const isLeader = club.club_leaders.find(
        (leader) => leader.email === auth.email
      );
      setClub(club);
      setLeader(isLeader);
    }
  }, [clubs, param.clubId, auth, navigate]);

  return (
    <Container>
      <Box sx={{ mt: 4, pb: 10 }}>
        {club && isLeader !== null && (
          <>
            <Details
              club={club}
              setInvokeFetchClubs={setInvokeFetchClubs}
              isLeader={isLeader}
            />
            <Forum isLeader={isLeader} />
          </>
        )}
      </Box>
    </Container>
  );
}

export default ClubDetail;
