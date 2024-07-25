import React from "react";
import { Box, Typography, Grid, Container, Button } from "@mui/material";
import HomeButton from "../base/HomeButton";
import { useUser } from "../../providers/userProvider";

function formatDate(timestamp) {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

const MyInfo = () => {
  const { user } = useUser();

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
        <Grid container spacing={1} columns={2}>
          <Grid item xs={2} sm={1}>
            <Typography variant="body1" mt={1}>
              Name: {user.firstName} {user.lastName}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={1}>
            <Typography variant="body1" mt={1}>
              Member Since: {formatDate(user.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={1}>
            <Typography variant="body1" mt={1}>
              Grade: {user.grade}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={1}>
            <Typography variant="body1" mt={1}>
              Email: {user.email}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default MyInfo;
