import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import HomeButton from "../components/base/HomeButton";
import { useUser } from "../providers/userProvider";

function formatDate(timestamp) {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function Profile() {
  const { user } = useUser();
  const recommendedClubs = ["1 Club", "2 Club", "3 Club", "4 Club"];
  const favoriteClubs = ["11 Club", "12 Club", "13 Club", "14 Club"];

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box display="flex" width="100%" justifyContent="space-between">
          <HomeButton />
          <Button variant="contained">Sign out</Button>
        </Box>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h5">My Info</Typography>
      </Box>
      {user && (
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="body1" mt={1}>
              Name: {user.firstName} {user.lastName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" mt={1}>
              Member Since: {formatDate(user.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" mt={1}>
              Grade: {user.grade}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" mt={1}>
              Email: {user.email}
            </Typography>
          </Grid>
        </Grid>
      )}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Recommendations</Typography>
        <Button variant="outlined">TAKE SURVEY AGAIN</Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <List>
          {recommendedClubs.map((club, index) => (
            <ListItem key={index}>
              <Typography variant="body1">{club}</Typography>
            </ListItem>
          ))}
        </List>
        <Typography variant="h5">My Favorites</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <List>
          {favoriteClubs.map((club, index) => (
            <ListItem key={index}>
              <Typography variant="body1">{club}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default Profile;
