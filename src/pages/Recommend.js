import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Typography,
} from '@mui/material';
import FormSelectField from '../components/base/FormSelectField';
import {
  ACTIVITY_CATEGORIES,
  RELEVANT_SUBJECT_CATEGORIES,
  SEMESTER_CATEGORIES,
  TARGET_SERVICE_CATEGORIES,
  TIME_COMM_OPTIONS,
} from '../lib/constants';

function Recommend() {
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
              width: 400,
              padding: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <Typography variant='h5'>Recommendations Survey</Typography>
            <FormControl component='fieldset' variant='standard' required>
              <FormLabel component='legend'>CAS Requirement</FormLabel>
              <FormGroup>
                <FormControlLabel
                  label='Creativity'
                  control={<Checkbox name='Creativity' />}
                />
                <FormControlLabel
                  label='Activity'
                  control={<Checkbox name='Activity' />}
                />
                <FormControlLabel
                  label='Service'
                  control={<Checkbox name='Service' />}
                />
              </FormGroup>
            </FormControl>
            <FormSelectField
              label='Type of Activity'
              nullable
              options={ACTIVITY_CATEGORIES}
            />
            <FormSelectField
              label='Target Service Group'
              nullable
              options={TARGET_SERVICE_CATEGORIES}
            />
            <FormSelectField
              label='Relevant Subject'
              nullable
              options={RELEVANT_SUBJECT_CATEGORIES}
            />
            <FormSelectField
              label='Time Commitment'
              nullable
              options={TIME_COMM_OPTIONS}
            />
            <FormSelectField
              label='Semester(s)'
              required
              options={SEMESTER_CATEGORIES}
            />
            <Button variant='contained'>
              <span>Submit</span>
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default Recommend;
