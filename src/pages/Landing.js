import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <Container maxWidth='md' sx={{ height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          paddingX: 5,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <Typography variant='h5'>Welcome to Clubhub</Typography>
          <Button onClick={goToHome}>Go to home</Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default Landing;
