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

const GRADE_ITEMS = [
  { value: 9, label: 9 },
  { value: 10, label: 10 },
  { value: 11, label: 11 },
  { value: 12, label: 12 },
];

function SignUp() {
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
            <TextField size='small' required label='First name' />
            <TextField size='small' required label='Last name' />
            <FormControl required size='small'>
              <InputLabel>Grade</InputLabel>
              <Select label='Grade'>
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
            <Button variant='contained'>
              <span>Submit</span>
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
