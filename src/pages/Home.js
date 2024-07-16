import { useMemo, useState } from 'react';
import { Box, Chip, Container, Grid, Typography } from '@mui/material';
import mockData from '../lib/mock.json';
import ClubItem from '../components/ClubItem';
import { ACTIVITY_CATEGORIES, CAS_CATEGORIES } from '../lib/constants';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSeeClub = (clubId) => {
    navigate(`/club/${clubId}`);
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
    let filteredClubs = mockData;

    if (selectedCategories.length > 0) {
      filteredClubs = filteredClubs.filter((item) => {
        return (
          selectedCategories.includes(item.cas_requirements) ||
          selectedCategories.includes(item.type_of_activity)
        );
      });
    }

    return filteredClubs;
  }, [selectedCategories]);

  return (
    <Container maxWidth='md' sx={{ height: '100vh' }}>
      <Box sx={{ my: 4 }}>
        <Typography variant='h5' mb={4}>
          Hey,
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Box>
            <Typography>CAS Requirement</Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                py: 1,
                mb: 2,
                overflowX: 'auto',
                '&::-webkit-scrollbar': { height: '4px' },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'rgba(221,221,221,0.5)',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: 10,
                },
              }}
            >
              {CAS_CATEGORIES.map((item) => (
                <Chip
                  onClick={() => handleSelectCategory(item.value)}
                  key={item.value}
                  label={item.label}
                  variant={
                    selectedCategories.includes(item.value)
                      ? 'filled'
                      : 'outlined'
                  }
                />
              ))}
            </Box>
          </Box>
          <Box>
            <Typography>Type of Activity</Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                py: 1,
                overflowX: 'auto',
                '&::-webkit-scrollbar': { height: '4px' },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'rgba(221,221,221,0.5)',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: 10,
                },
              }}
            >
              {ACTIVITY_CATEGORIES.map((item) => (
                <Chip
                  onClick={() => handleSelectCategory(item.value)}
                  key={item.value}
                  label={item.label}
                  variant={
                    selectedCategories.includes(item.value)
                      ? 'filled'
                      : 'outlined'
                  }
                />
              ))}
            </Box>
          </Box>
        </Box>
        <Grid container spacing={2} columns={{ xs: 1, sm: 8, md: 12 }}>
          {filteredData.map((club) => (
            <ClubItem
              onSeeClub={handleSeeClub}
              club={club}
              key={club.clubId}
            />
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;