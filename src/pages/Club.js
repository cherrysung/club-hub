import { Box, Typography } from '@mui/material';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import HomeButton from '../components/base/HomeButton';
import ProfileButton from '../components/base/ProfileButton';
import { useClubs } from '../providers/clubsProvider';
import { useAuth } from '../providers/authProvider';
import { Flag } from '@mui/icons-material';

function Club() {
  const navigate = useNavigate();
  const param = useParams();
  const { clubs } = useClubs();
  const { auth } = useAuth();
  const [selected, setSelected] = useState(param.clubId ?? '');
  const containerRef = useRef(null);

  const handleSelectClub = (clubId) => {
    setSelected(clubId);
    navigate(`/club/${clubId}`);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [selected]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          maxWidth: 360,
          minWidth: 280,
          height: '100vh',
          overflowY: 'auto',
          borderRight: 1,
          borderColor: 'grey.300',
          pb: 5,
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <HomeButton />
          <ProfileButton />
        </Box>
        <Typography variant='h5' sx={{ mt: 3, ml: 2, mb: 3 }}>
          Clubhub
        </Typography>
        {clubs.map((club) => (
          <Box
            key={club.clubId}
            onClick={() => handleSelectClub(club.clubId)}
            sx={{
              px: 2,
              py: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: selected === club.clubId ? 'grey.300' : 'white',
              '&:hover': {
                backgroundColor: 'lightblue',
              },
            }}
          >
            <Typography variant='h8'>{club.club_name} </Typography>
            {club.club_leaders.find(
              (leader) => leader.email === auth.email
            ) && <Flag />}
          </Box>
        ))}
      </Box>
      <Box
        ref={containerRef}
        flex={1}
        sx={{ height: '100vh', overflowY: 'auto' }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Club;
