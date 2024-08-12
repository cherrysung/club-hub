import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

function MyRecommendations({ onNavigate, onTakeSurvey, recommendations }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5'>Recommendations</Typography>
        <Button onClick={onTakeSurvey} variant='outlined'>
          Take survey again
        </Button>
      </Box>
      <List>
        {recommendations.length > 0 ? (
          recommendations.map((club) => (
            <ListItem disablePadding key={club?.clubId}>
              <ListItemButton dense onClick={() => onNavigate(club?.clubId)}>
                <ListItemText primary={club?.club_name} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <Typography color='GrayText'>No items</Typography>
        )}
      </List>
    </Box>
  );
}

export default MyRecommendations;
