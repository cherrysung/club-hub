import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "../lib/firebase/init";
import { useAuth } from "../providers/authProvider";

const GRADE_ITEMS = [
  { value: 9, label: 9 },
  { value: 10, label: 10 },
  { value: 11, label: 11 },
  { value: 12, label: 12 },
];

function SignUp() {
  const { auth } = useAuth();

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    grade: "",
  });

  const handleSignup = async () => {
    if (!auth) return;
    if (!credentials.firstName || !credentials.lastName || !credentials.grade) {
      return;
    }

    try {
      const firestore = getFirestore(app);
      const userRef = doc(firestore, "users", auth.uid);
      await updateDoc(userRef, {
        ...credentials,
        favorites: [],
        recommendations: {},
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Box component="form">
          <Paper
            elevation={3}
            sx={{
              padding: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h5">Sign Up</Typography>
            <TextField
              size="small"
              required
              label="First name"
              value={credentials.firstName}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  firstName: e.target.value,
                })
              }
            />
            <TextField
              size="small"
              required
              label="Last name"
              value={credentials.lastName}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  lastName: e.target.value,
                })
              }
            />
            <FormControl required size="small">
              <InputLabel>Grade</InputLabel>
              <Select
                label="Grade"
                value={credentials.grade}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    grade: e.target.value,
                  })
                }
              >
                <MenuItem disabled value="">
                  <em>Select a grade</em>
                </MenuItem>
                {GRADE_ITEMS.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleSignup}>
              <span>Submit</span>
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
