import { Box, Button, Typography, IconButton } from '@mui/material';
import { ArrowBack, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import mockData from '../lib/mock.json';

function Club() {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [clickedItemId, setClickedItemId] = useState(null);

  const handleBackHomeClick = () => {
    navigate('/home');
  };

  const handleItemClick = (id) => {
    setClickedItemId(id);
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
        <Button
          onClick={handleBackHomeClick}
          sx={{
            color: 'blue',
            textTransform: 'none',
            alignSelf: 'flex-start',
            padding: '3px 6px',
            fontSize: '0.8rem',
            ml: 1,
            mt: 1,
          }}
          startIcon={<ArrowBack />}
        >
          BACK HOME
        </Button>

        <Typography variant='h5' sx={{ mt: 3, ml: 1, mb: 3 }}>
          Clubhub
        </Typography>
        {mockData.map((club) => (
          <Box
            key={club.clubId}
            onClick={() => handleItemClick(club.clubId)}
            sx={{
              px: 2,
              py: 1,
              cursor: 'pointer',
              backgroundColor:
                clickedItemId === club.clubId ? 'grey.300' : 'white',
              '&:hover': {
                backgroundColor: 'lightblue',
              },
            }}
          >
            <Typography variant='h8'>{club.club_name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Club;
