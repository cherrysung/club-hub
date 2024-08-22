import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/authProvider";

function Landing() {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();

  const handleSignin = async () => {
    try {
      const isNewUser = await signInWithGoogle();
      if (isNewUser) {
        navigate("/signup");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Failed to sign in: ", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          paddingX: 5,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 5,
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <Box height={50}>
            <img
              alt="clubhub logo"
              src="/images/clubhub-logo.png"
              height="100%"
            />
          </Box>
          <Button onClick={handleSignin} variant="contained">
            Sign In
          </Button>
          <Typography variant="h5" component="h5" sx={{ marginBottom: -3 }}>
            Club Hub Rationale
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.3,
            }}
          >
            This web app is designed to provide students with a view of all the
            clubs based on scheduling, subject focus, CAS strands, and MYP
            learning outcomes to help facilitate decision-making, help narrow
            down clubs based on interest, and recommend club choices. It allows
            students to gain a better understanding of which clubs to look out
            for ahead of the club fair while making their final decision via
            Google Form. Although it is a work in progress, the club hub aims to
            organize club selection for students using technology.
          </Typography>
        </Paper>

        <Typography
          sx={{
            fontSize: 13,
            position: "absolute",
            bottom: 10,
            textAlign: "center",
            width: "100%",
            color: "grey",
          }}
        >
          © Jihyeon (Cherry) Sung, Service Council
        </Typography>
      </Box>
    </Container>
  );
}

export default Landing;
