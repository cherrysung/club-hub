import { Box, Chip, Typography } from '@mui/material';
import { ACTIVITY_CATEGORIES, CAS_CATEGORIES } from '../../../lib/constants';

function ClubFilters({ onSelectCategory, selectedCategories }) {
  const handleSelectCategory = (category) => {
    onSelectCategory(category);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box>
        <Typography>CAS Requirement</Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            py: 1,
            mb: 2,
            overflowX: 'auto',
            '&::-webkit-scrollbar': { height: '4px' },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(221,221,221,0.5)',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: 10,
            },
          }}
        >
          {CAS_CATEGORIES.map((item) => (
            <Chip
              onClick={() => handleSelectCategory(item.value)}
              key={item.value}
              label={item.label}
              variant={
                selectedCategories.includes(item.value) ? 'filled' : 'outlined'
              }
            />
          ))}
        </Box>
      </Box>
      <Box>
        <Typography>Type of Activity</Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            py: 1,
            overflowX: 'auto',
            '&::-webkit-scrollbar': { height: '4px' },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(221,221,221,0.5)',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: 10,
            },
          }}
        >
          {ACTIVITY_CATEGORIES.map((item) => (
            <Chip
              onClick={() => handleSelectCategory(item.value)}
              key={item.value}
              label={item.label}
              variant={
                selectedCategories.includes(item.value) ? 'filled' : 'outlined'
              }
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default ClubFilters;
