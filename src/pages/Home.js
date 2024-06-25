import { ArrowForward, Favorite } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';

function Home() {
  return (
    <Container maxWidth='md' sx={{ height: '100vh' }}>
      <Box sx={{ my: 4 }}>
        <Typography variant='h5' mb={4}>
          Home
        </Typography>
        <Grid container spacing={2} columns={{ xs: 1, sm: 8, md: 12 }}>
          <Grid item xs={1} sm={4} md={4}>
            <Card sx={{ height: 360, position: 'relative' }}>
              <CardMedia
                sx={{ height: 180 }}
                image='images/club_1.jpg'
                alt='club image'
              />
              <CardContent>
                <Typography variant='h6'>Club Name</Typography>
                <Typography variant='body2'>
                  Creativiy | Community & Service
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton>
                  <Favorite />
                </IconButton>
                <IconButton>
                  <ArrowForward />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
