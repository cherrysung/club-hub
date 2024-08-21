import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Typography,
} from "@mui/material";
import FormSelectField from "../components/base/FormSelectField";
import { useAuth } from "../providers/authProvider";
import {
  ACTIVITY_CATEGORIES,
  RELEVANT_SUBJECT_CATEGORIES,
  SEMESTER_CATEGORIES,
  TARGET_SERVICE_CATEGORIES,
  TIME_COMM_OPTIONS,
} from "../lib/constants";
import { useEffect, useState } from "react";
import { updateRecommendations } from "../lib/firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useUser } from "../providers/userProvider";

function Recommend() {
  const { auth } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [input, setInputs] = useState({
    Creativity: false,
    Activity: false,
    Service: false,
    "Type of Activity": "",
    "Service Target Group": "",
    "Relevant Subject": "",
    "Time Commitment": "",
    Semesters: "",
  });
  const [isInvalid, setInvalid] = useState({
    cas: false,
    semesters: false,
  });

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  const checkIsValid = () => {
    const CASReqExists = input.Creativity || input.Activity || input.Service;
    const semesterExists = !!input.Semesters;

    if (!CASReqExists || !semesterExists) {
      setInvalid({
        cas: !CASReqExists,
        semesters: !semesterExists,
      });
      return false;
    }

    setInvalid({
      cas: false,
      semesters: false,
    });
    return true;
  };

  const handleSubmit = async () => {
    const isValid = checkIsValid();

    if (!auth) return;
    if (!isValid) return;

    const payload = {
      Year: user.grade,
      Creativity: input.Creativity ? 1 : 0,
      Activity: input.Activity ? 1 : 0,
      Service: input.Service ? 1 : 0,
      "Type of Activity": input["Type of Activity"] || null,
      "Service Target Group": input["Service Target Group"] || null,
      "Relevant Subject": input["Relevant Subject"] || null,
      "Time commitment": Number(input["Time Commitment"]),
      "Semester 1 availability":
        input.Semesters === "1" || input.Semesters === "both" ? 1 : 0,
      "Semester 2 availability":
        input.Semesters === "2" || input.Semesters === "both" ? 1 : 0,
      "Outside of school time used": 0,
      "Like to work together or not": 0,
      "Introvert or not": 0,
      "Writing ability": 0,
      "Organization skills": 0,
      "Self management skills": 0,
    };

    try {
      setLoading(true);
      const response = await fetch(
        "https://clubrec-3e4f153fcece.herokuapp.com/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const recommendations = await response.json();
        await updateRecommendations(auth.uid, payload, recommendations);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
              width: 400,
              padding: 5,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography variant="h5">Recommendations Survey</Typography>
            <FormControl
              component="fieldset"
              variant="standard"
              required
              error={isInvalid.cas}
            >
              <FormLabel component="legend">CAS Requirement</FormLabel>
              <FormGroup>
                <FormControlLabel
                  label="Creativity"
                  control={
                    <Checkbox
                      checked={input.Creativity}
                      name="Creativity"
                      onChange={(e) => {
                        setInputs({
                          ...input,
                          Creativity: e.target.checked,
                        });
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Activity"
                  control={
                    <Checkbox
                      name="Activity"
                      checked={input.Activity}
                      onChange={(e) => {
                        setInputs({
                          ...input,
                          Activity: e.target.checked,
                        });
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Service"
                  control={
                    <Checkbox
                      name="Service"
                      checked={input.Service}
                      onChange={(e) => {
                        setInputs({
                          ...input,
                          Service: e.target.checked,
                        });
                      }}
                    />
                  }
                />
              </FormGroup>
            </FormControl>
            <FormSelectField
              label="Type of Activity"
              nullable
              options={ACTIVITY_CATEGORIES}
              value={input["Type of Activity"]}
              onChange={(e) => {
                setInputs({
                  ...input,
                  "Type of Activity": e.target.value,
                });
              }}
            />
            <FormSelectField
              label="Service Target Group"
              nullable
              options={TARGET_SERVICE_CATEGORIES}
              value={input["Service Target Group"]}
              onChange={(e) => {
                setInputs({
                  ...input,
                  "Service Target Group": e.target.value,
                });
              }}
            />
            <FormSelectField
              label="Relevant Subject"
              nullable
              options={RELEVANT_SUBJECT_CATEGORIES}
              value={input["Relevant Subject"]}
              onChange={(e) => {
                setInputs({
                  ...input,
                  "Relevant Subject": e.target.value,
                });
              }}
            />
            <FormSelectField
              label="Time Commitment"
              nullable
              options={TIME_COMM_OPTIONS}
              value={input["Time Commitment"]}
              onChange={(e) => {
                setInputs({
                  ...input,
                  "Time Commitment": e.target.value,
                });
              }}
            />
            <FormSelectField
              label="Semester(s)"
              required
              error={isInvalid.semesters}
              options={SEMESTER_CATEGORIES}
              value={input.Semesters}
              onChange={(e) => {
                setInputs({
                  ...input,
                  Semesters: e.target.value,
                });
              }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading && (
                <CircularProgress
                  size={15}
                  color="inherit"
                  sx={{ marginRight: 1 }}
                />
              )}
              <span>Submit</span>
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default Recommend;
