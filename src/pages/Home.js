import { Box, Container, Grid, Paper, Typography } from '@mui/material';

const ADVICE_API_URL = 'https://api.adviceslip.com/advice';

function Home() {
  return (
    <Container maxWidth='md' sx={{ height: '100vh' }}>
      <Box sx={{ my: 4 }}>
        <Typography variant='h5' mb={4}>
          Home
        </Typography>
        <Grid container spacing={2} columns={{ xs: 1, sm: 8, md: 12 }}>
          <Grid item xs={1} sm={4} md={4}>
            <Paper sx={{ p: 1, textAlign: 'center' }}>Club Item</Paper>
          </Grid>
          <Grid item xs={1} sm={4} md={4}>
            <Paper sx={{ p: 1, textAlign: 'center' }}>Club Item</Paper>
          </Grid>
          <Grid item xs={1} sm={4} md={4}>
            <Paper sx={{ p: 1, textAlign: 'center' }}>Club Item</Paper>
          </Grid>
          <Grid item xs={1} sm={4} md={4}>
            <Paper sx={{ p: 1, textAlign: 'center' }}>Club Item</Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
