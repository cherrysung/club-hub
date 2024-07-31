import { AccessTime, Delete, Person } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

function ReplyItem({
  content,
  name,
  createdAt,
  canDelete,
  onDelete,
  isLeader,
  isLeaderPost,
}) {
  return (
    <Box mb={3}>
      <Typography mb={1}>{content}</Typography>
      <Box display='flex' alignItems='center' gap={2}>
        <Box
          display='flex'
          alignItems='center'
          gap={0.5}
          color={isLeaderPost ? 'primary.main' : 'GrayText'}
        >
          <Person fontSize='small' />
          <Typography variant='body2'>
            {name} {isLeaderPost && '(Leader)'}
          </Typography>
        </Box>
        <Box display='flex' alignItems='center' gap={0.5} color='GrayText'>
          <AccessTime />
          <Typography variant='body2'>
            {createdAt && createdAt.toDate().toDateString()}
          </Typography>
        </Box>
        {canDelete && (
          <IconButton onClick={onDelete}>
            <Delete />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export default ReplyItem;
