import { Box, Container, Paper, Typography } from '@mui/material';

function Landing() {
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
          }}
        >
          <Typography variant='h5'>Welcome to Clubhub</Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default Landing;
