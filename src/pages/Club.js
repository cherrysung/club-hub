import { Box, Typography } from '@mui/material';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import mockData from '../lib/mock.json';
import HomeButton from '../components/base/HomeButton';
import ProfileButton from '../components/base/ProfileButton';

function Club() {
  const navigate = useNavigate();
  const param = useParams();
  const [selected, setSelected] = useState(param.clubId ?? '');

  const handleSelectClub = (clubId) => {
    setSelected(clubId);
    navigate(`/club/${clubId}`);
  };

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
        {mockData.map((club) => (
          <Box
            key={club.clubId}
            onClick={() => handleSelectClub(club.clubId)}
            sx={{
              px: 2,
              py: 1,
              cursor: 'pointer',
              backgroundColor: selected === club.clubId ? 'grey.300' : 'white',
              '&:hover': {
                backgroundColor: 'lightblue',
              },
            }}
          >
            <Typography variant='h8'>{club.club_name}</Typography>
          </Box>
        ))}
      </Box>
      <Box flex={1} sx={{ height: '100vh', overflowY: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Club;
