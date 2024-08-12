import { Box, Chip, IconButton, Typography } from '@mui/material';
import { ACTIVITY_CATEGORIES, CAS_CATEGORIES } from '../../../lib/constants';
import { Cancel } from '@mui/icons-material';

function ClubFilters({
  onSelectCategory,
  selectedCategories,
  onClearCategory,
}) {
  const isCASSelected = CAS_CATEGORIES.some((item) =>
    selectedCategories.includes(item.value)
  );
  const isActivitySelected = ACTIVITY_CATEGORIES.some((item) =>
    selectedCategories.includes(item.value)
  );

  const handleSelectCategory = (category) => {
    onSelectCategory(category);
  };

  const handleClearCategory = (category) => {
    if (category === 'CAS') {
      onClearCategory(CAS_CATEGORIES.map((item) => item.value));
    }
    if (category === 'Activity') {
      onClearCategory(ACTIVITY_CATEGORIES.map((item) => item.value));
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box>
        <Typography>CAS Requirement</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
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
          {isCASSelected && (
            <IconButton size='small' onClick={() => handleClearCategory('CAS')}>
              <Cancel />
            </IconButton>
          )}
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
          {isActivitySelected && (
            <IconButton
              size='small'
              onClick={() => handleClearCategory('Activity')}
            >
              <Cancel />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ClubFilters;
