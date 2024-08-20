import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/authProvider';

function Landing() {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();

  const handleSignin = async () => {
    try {
      const isNewUser = await signInWithGoogle();
      if (isNewUser) {
        navigate('/signup');
      } else {
        navigate('/home');
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
          flexDirection: 'column',
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
          <Box height={50}>
            <img
              alt='clubhub logo'
              src='/images/clubhub-logo.png'
              height='100%'
            />
          </Box>
          <Button onClick={handleSignin} variant='contained'>
            Sign In
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default Landing;
