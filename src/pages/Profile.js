import { Box, Button, Container } from '@mui/material';
import HomeButton from '../components/base/HomeButton';
import { useAuth } from '../providers/authProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Profile() {
  const { signout, auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  const handleSignout = async () => {
    await signout();
  };

  return (
    <Container maxWidth='md'>
      <Box sx={{ my: 4 }}>
        <Box display='flex' width='100%' justifyContent='space-between'>
          <HomeButton />
          <Button variant='contained' onClick={handleSignout}>
            Sign out
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;
