import { Delete } from '@mui/icons-material';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

function MyRecommendations({ onNavigate, favorites, onUnfavorite }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5'>Favorites</Typography>
      </Box>
      <List>
        {favorites?.length > 0 ? (
          favorites.map((club) => (
            <ListItem
              disablePadding
              key={club.clubId}
              secondaryAction={
                <IconButton
                  onClick={() => onUnfavorite(club.clubId)}
                  edge='end'
                  aria-label='remove from favorites'
                >
                  <Delete />
                </IconButton>
              }
            >
              <ListItemButton dense onClick={() => onNavigate(club.clubId)}>
                <ListItemText primary={club.club_name} />
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
