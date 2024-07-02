import React, { useState } from 'react';
import { Box, Container, Chip, Grid, Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder, ArrowForward } from '@mui/icons-material';

function Home() {
  const [liked, setLiked] = useState(false);

    const clubs = [
      { id: 1, name: 'Club Name 1', image: 'images/club_1.jpg', description: 'Creativity | Community Service', chipLabel: 'Sem 1 only' },
      { id: 2, name: 'Club Name 2', image: 'images/club_2.jpg', description: 'Creativity & Service | Community Service', chipLabel: 'Sem 2 only' },
      { id: 3, name: 'Club Name 3', image: 'images/club_3.jpg', description: 'Creativity | Research', chipLabel: 'Both, optional' },
      { id: 4, name: 'Club Name 4', image: 'images/club_1.jpg', description: 'Service | Debate', chipLabel: 'Sem 2 only' },
      { id: 5, name: 'Club Name 5', image: 'images/club_2.jpg', description: 'Creativity | Research', chipLabel: 'Sem 2 only' },
      { id: 6, name: 'Club Name 6', image: 'images/club_3.jpg', description: 'Creativity & Service | Sports', chipLabel: 'Both, optional' },
      { id: 7, name: 'Club Name 7', image: 'images/club_1.jpg', description: 'Service | Debate', chipLabel: 'Sem 2 only' },
      { id: 8, name: 'Club Name 8', image: 'images/club_2.jpg', description: 'Creativity | Research', chipLabel: 'Sem 2 only' },
      { id: 9, name: 'Club Name 9', image: 'images/club_3.jpg', description: 'Creativity & Service | Sports', chipLabel: 'Both, optional' }
    ];

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <Container maxWidth='md' sx={{ height: '100vh' }}>
      <Box sx={{ my: 4 }}>
        <Typography variant='h5' mb={4}>
          Hey,
        </Typography>
        <Grid container spacing={2} columns={{ xs: 1, sm: 8, md: 12 }}>
          {clubs.map((club) => (
            <Grid item xs={12} sm={4} md={4} key={club.id}>
              <Card sx={{ height: 360, position: 'relative' }}>
                <CardMedia
                  sx={{ height: 180 }}
                  image={club.image}
                  alt={`${club.name} image`}
                />
                <Chip
                  label={club.chipLabel}
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                  }}
                />
                <CardContent>
                  <Typography variant='h6'>{club.name}</Typography>
                  <Typography variant='body2'>{club.description}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={handleLikeClick}>
                    {liked ? <Favorite color="error" /> : <FavoriteBorder />}
                  </IconButton>
                  <IconButton>
                    <ArrowForward />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
