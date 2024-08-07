import { Box, Grid, Typography } from '@mui/material';
import Editableimage from './EditableImage';
import { updateClub, updateClubImage } from '../../../lib/firebase/firestore';
import EditableText from './EditableText';

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
      <Typography variant='h5' mt={11} mb={4}>
        {club.club_name}
      </Typography>
      <Grid container spacing={3} columns={2}>
        <Grid item sm={2} md={1}>
          <Box position='relative'>
            <Typography variant='body2' fontWeight={600} sx={{ mb: 1 }}>
              Description
            </Typography>
            {isLeader ? (
              <EditableText
                value={club.description}
                multiline
                onSave={(newValue) => handleSave('description', newValue)}
              />
            ) : (
              <Typography>{club.description}</Typography>
            )}
          </Box>
        </Grid>
        <Grid item sm={2} md={1}>
          {isLeader ? (
            <Editableimage src={club.imageSrc} onEdit={handleUploadImage} />
          ) : (
            <Box
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                width: '100%',
                height: '100%',
              }}
            >
              <img
                src={club.imageSrc}
                alt='club'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          )}
        </Grid>
        <Grid item sm={2} md={1}>
          <Box>
            <Typography variant='body2' fontWeight={600} sx={{ mb: 1 }}>
              Supervisor(s)
            </Typography>
            {club.supervisor.map((sup, index) => (
              <Typography key={index}>{sup}</Typography>
            ))}
          </Box>
        </Grid>
        <Grid item sm={2} md={1}>
          <Box>
            <Typography variant='body2' fontWeight={600} sx={{ mb: 1 }}>
              Leader(s)
            </Typography>
            {club.club_leaders.map((leader, index) => (
              <Typography key={index}>
                {leader.name} {leader.grade ? `(${leader.grade})` : ''}
              </Typography>
            ))}
          </Box>
        </Grid>
        <Grid item sm={2} md={1}>
          <Box>
            <Typography variant='body2' fontWeight={600} sx={{ mb: 1 }}>
              Information
            </Typography>
            <Typography>
              Semester(s): {club.semesters || 'Not Available'}
            </Typography>
            <Typography>Room: {club.room || 'Not Available'}</Typography>
            <Typography>
              Type of Activity: {club.type_of_activity || 'Not Available'}
            </Typography>
            <Typography>
              CAS Requirement: {club.cas_requirements || 'Not Available'}
            </Typography>
            <Typography>
              Relevant Subject: {club.relevant_subject || 'Not Available'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Details;
