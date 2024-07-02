import { ArrowForward, Favorite, FavoriteBorder } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useState } from 'react';

function ClubItem({ club }) {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <Grid item xs={12} sm={4} md={4} key={club.clubId}>
      <Card sx={{ height: 360, position: 'relative' }}>
        <CardMedia
          sx={{ height: 180 }}
          image={club.imageSrc}
          alt={`${club.club_name} image`}
        />
        <Chip
          label={club.semesters}
          color='primary'
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        />
        <CardContent sx={{ paddingBottom: 0 }}>
          <Typography
            variant='h6'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 2,
              height: 64,
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            {club.club_name}
          </Typography>
          <Typography variant='body2'>
            {club.cas_requirements} | {club.type_of_activity}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            position: 'absolute',
            bottom: 0,
          }}
        >
          <IconButton onClick={handleLikeClick}>
            {liked ? <Favorite color='error' /> : <FavoriteBorder />}
          </IconButton>
          <IconButton>
            <ArrowForward />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ClubItem;
