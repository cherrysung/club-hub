import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../providers/authProvider';
import { updateUserDoc } from '../lib/firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { GRADE_ITEMS } from '../lib/constants';

function SignUp() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
    grade: '',
  });

  const handleSignup = async () => {
    if (!auth) return;
    if (!credentials.firstName || !credentials.lastName || !credentials.grade) {
      return;
    }

    try {
      await updateUserDoc(auth.uid, {
        ...credentials,
        favorites: [],
        recommendations: {},
      });
      navigate('/recommend');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth='md'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Box component='form'>
          <Paper
            elevation={3}
            sx={{
              padding: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography variant='h5'>Sign Up</Typography>
            <TextField
              size='small'
              required
              label='First name'
              value={credentials.firstName}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  firstName: e.target.value,
                })
              }
            />
            <TextField
              size='small'
              required
              label='Last name'
              value={credentials.lastName}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  lastName: e.target.value,
                })
              }
            />
            <FormControl required size='small'>
              <InputLabel>Grade</InputLabel>
              <Select
                label='Grade'
                value={credentials.grade}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    grade: e.target.value,
                  })
                }
              >
                <MenuItem disabled value=''>
                  <em>Select a grade</em>
                </MenuItem>
                {GRADE_ITEMS.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant='contained' onClick={handleSignup}>
              <span>Submit</span>
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
