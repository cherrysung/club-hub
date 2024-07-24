import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/authProvider';
import { useEffect } from 'react';

function Landing() {
  const navigate = useNavigate();
  const { signInWithGoogle, auth } = useAuth();

  useEffect(() => {
    if (auth) {
      navigate('/home');
    }
  }, [auth, navigate]);

  const handleSignin = async () => {
    try {
      const isNewUser = await signInWithGoogle();
      if (isNewUser) {
        navigate('/signup');
      }
    } catch (error) {
      console.error('Failed to sign in: ', error);
    }
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
          <Button onClick={handleSignin}>Sign In</Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default Landing;
