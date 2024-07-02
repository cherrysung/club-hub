import React from 'react';
import { Box, Chip, Container, Grid, Typography } from '@mui/material';
import mockData from '../lib/mock.json';
import ClubItem from '../components/ClubItem';
import { ACTIVITY_CATEGORIES, CAS_CATEGORIES } from '../lib/constants';

function Home() {
  return (
    <Container maxWidth='md' sx={{ height: '100vh' }}>
      <Box sx={{ my: 4 }}>
        <Typography variant='h5' mb={4}>
          Hey,
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Box>
            {/* CAS Cat */}
            <Typography>CAS Requirement</Typography>
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
              {CAS_CATEGORIES.map((item) => (
                <Chip key={item.value} label={item.label} variant='outlined' />
              ))}
            </Box>
          </Box>
          <Box>{/* Activity Cat */}</Box>
        </Box>
        <Grid container spacing={2} columns={{ xs: 1, sm: 8, md: 12 }}>
          {mockData.map((club) => (
            <ClubItem club={club} key={club.clubId} />
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
