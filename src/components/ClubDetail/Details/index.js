import { Box, Grid, Typography } from "@mui/material";
import Editableimage from "./EditableImage";
import { updateClub, updateClubImage } from "../../../lib/firebase/firestore";
import EditableText from "./EditableText";
import {
  ACTIVITY_CATEGORIES,
  CAS_CATEGORIES,
  NO_IMAGE_SRC,
} from "../../../lib/constants";
import EditableSelect from "./EditableSelect";

function Details({ club, setInvokeFetchClubs, isLeader }) {
  const handleUploadImage = async (newFile) => {
    try {
      await updateClubImage(club.clubId, newFile);
      setInvokeFetchClubs(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (field, newValue) => {
    try {
      await updateClub(club.clubId, field, newValue);
      setInvokeFetchClubs(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h5" mt={11} mb={4}>
        {club.club_name}
      </Typography>
      <Grid container spacing={3} columns={2}>
        <Grid item sm={2} md={1}>
          <Box position="relative">
            <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
              Description
            </Typography>
            {isLeader ? (
              <EditableText
                value={club.description}
                multiline
                onSave={(newValue) => handleSave("description", newValue)}
              />
            ) : (
              <Typography>{club.description}</Typography>
            )}
          </Box>
        </Grid>
        <Grid item sm={2} md={1}>
          {isLeader ? (
            <Editableimage
              src={club.imageSrc || NO_IMAGE_SRC}
              onEdit={handleUploadImage}
            />
          ) : (
            <Box
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                width: "100%",
                height: "100%",
                maxHeight: 350,
              }}
            >
              <img
                src={club.imageSrc || NO_IMAGE_SRC}
                alt="club"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          )}
        </Grid>
        <Grid item sm={2} md={1}>
          <Box>
            <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
              Supervisor(s)
            </Typography>
            {club.supervisor.map((sup, index) => (
              <Typography key={index}>{sup}</Typography>
            ))}
          </Box>
        </Grid>
        <Grid item sm={2} md={1}>
          <Box>
            <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
              Leader(s)
            </Typography>
            {club.club_leaders.map((leader, index) => (
              <Typography key={index}>
                {leader.name} {leader.grade ? `(${leader.grade})` : ""}
              </Typography>
            ))}
          </Box>
        </Grid>
        <Grid item sm={2} md={1}>
          <Box>
            <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
              Information
            </Typography>
            <Typography>
              Semester(s): {club.semesters || "Not Available"}
            </Typography>
            <Typography>Room: {club.room || "Not Available"}</Typography>
            <Box position="relative" display="flex" gap={1}>
              Type of Activity:
              {isLeader ? (
                <Box flex={1}>
                  <EditableSelect
                    options={ACTIVITY_CATEGORIES}
                    value={club.type_of_activity}
                    onSave={(newValue) =>
                      handleSave("type_of_activity", newValue)
                    }
                  />
                </Box>
              ) : (
                <Typography>{club.type_of_activity}</Typography>
              )}
            </Box>
            <Box position="relative" display="flex" gap={1}>
              CAS Requirement:
              {isLeader ? (
                <Box flex={1}>
                  <EditableSelect
                    options={CAS_CATEGORIES}
                    value={club.cas_requirements}
                    onSave={(newValue) =>
                      handleSave("cas_requirements", newValue)
                    }
                  />
                </Box>
              ) : (
                <Typography>{club.cas_requirements}</Typography>
              )}
            </Box>
            <Box position="relative" display="flex" gap={1}>
              Relevant Subject:
              {isLeader ? (
                <EditableSelect
                  value={club.relevant_subject}
                  onSave={(newValue) =>
                    handleSave("relevant_subject", newValue)
                  }
                />
              ) : (
                <Typography>{club.relevant_subject}</Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Details;
