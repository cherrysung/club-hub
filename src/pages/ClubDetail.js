import { useParams } from 'react-router-dom';
import mockData from '../lib/mock.json';
import { Box, Container, Grid, Typography } from '@mui/material';

function ClubDetail() {
  const param = useParams();
  const club = mockData.find((club) => club.clubId === param.clubId);

  return (
    <Container>
      <Box sx={{ mt: 4, pb: 10 }}>
        {club && (
          <Box>
            <Typography variant='h5' mt={11} mb={4}>
              {club.club_name}
            </Typography>
            <Grid container spacing={3} columns={2}>
              <Grid item sm={2} md={1}>
                <Box>
                  <Typography variant='body2' fontWeight={600} sx={{ mb: 1 }}>
                    Description
                  </Typography>
                  <Typography>{club.description}</Typography>
                </Box>
              </Grid>
              <Grid item sm={2} md={1}>
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
        )}
      </Box>
    </Container>
  );
}

export default ClubDetail;
