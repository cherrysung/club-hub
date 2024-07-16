import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { GoogleAuthProvider, getAdditionalUserInfo, getAuth, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../lib/firebase/init';

function Landing() {
  const navigate = useNavigate();

  const handleSignin = async () => {
    // sign in with google
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
    const userCredential = await signInWithPopup(firebaseAuth, provider);
    const userAdditionalInfo = getAdditionalUserInfo(userCredential);
    const user = userCredential.user;
    if (user && userAdditionalInfo ) {
      if (userAdditionalInfo.isNewUser) {
      // if new user -> navigate to signup
        navigate('/signup');
      }
        // if existing user -> navigate to home
        navigate('/home');
    }
  } catch (error) {
    console.error(error);
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
