import { AccessTime, Delete, Person, Reply } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

function PostItem({ content, name, createdAt, canDelete, onDelete, postId }) {
  return (
    <Box mb={3}>
      <Typography mb={1}>{content}</Typography>
      <Box display='flex' alignItems='center' gap={2}>
        <Box display='flex' alignItems='center' gap={0.5}>
          <Person fontSize='small' />
          <Typography variant='body2'>{name}</Typography>
        </Box>
        <Box display='flex' alignItems='center' gap={0.5} color='GrayText'>
          <AccessTime fontSize='small' />
          <Typography variant='body2'>{createdAt}</Typography>
        </Box>
        <IconButton
          aria-label='reply to post'
          // onClick={() => setAddReply(true)}
        >
          <Reply />
        </IconButton>
        {canDelete && (
          <IconButton aria-label='delete' onClick={onDelete}>
            <Delete />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export default PostItem;
