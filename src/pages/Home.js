import { Box, Container, Typography } from '@mui/material';

function Home() {
  return (
    <Container maxWidth='md' sx={{ height: '100vh' }}>
      <Box sx={{ my: 4 }}>
        <Typography variant='h5'>Home</Typography>
      </Box>
    </Container>
  );
}

export default Home;
