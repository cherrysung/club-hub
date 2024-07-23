import { Box, Button, Container } from "@mui/material";
import HomeButton from "../components/base/HomeButton";
import { useUser } from "../providers/userProvider";

function Profile() {
  const { user } = useUser();

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box display="flex" width="100%" justifyContent="space-between">
          <HomeButton />
          <Button variant="contained">Sign out</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;
