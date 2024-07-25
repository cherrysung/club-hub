import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

function MyRecommendations({ onNavigate, favorites }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Favorites</Typography>
      </Box>
      <List>
        {favorites &&
          favorites.length > 0 &&
          favorites.map((club) => (
            <ListItem disablePadding key={club.clubId}>
              <ListItemButton dense onClick={() => onNavigate(club.clubId)}>
                <ListItemText primary={club.club_name} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );
}

export default MyRecommendations;
