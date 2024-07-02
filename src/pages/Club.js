import { Box } from '@mui/material';

function Club() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          maxWidth: 360,
          minWidth: 280,
          height: '100vh',
          overflowY: 'auto',
          borderRight: 1,
          borderColor: 'grey.300',
          pt: 3,
          pb: 5,
        }}
      >
        <Box>{/* Button section */}</Box>
      </Box>
    </Box>
  );
}

export default Club;
