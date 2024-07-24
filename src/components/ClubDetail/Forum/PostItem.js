import { AccessTime, Delete, Person, Reply } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import ReplyItem from './ReplyItem';
import { useState } from 'react';
import CreateReply from './CreateReply';

function PostItem({
  content,
  name,
  createdAt,
  canDelete,
  onDelete,
  postId,
  replies,
  currentAuthUid,
  onDeleteReply,
  onAddReply,
  isLeader,
}) {
  const [addReply, setAddReply] = useState(false);

  return (
    <Box mb={3}>
      <Typography mb={1}>{content}</Typography>
      <Box display='flex' alignItems='center' gap={2}>
        <Box
          display='flex'
          alignItems='center'
          gap={0.5}
          color={isLeader ? 'primary.main' : 'GrayText'}
        >
          <Person fontSize='small' />
          <Typography variant='body2'>
            {name} {isLeader && '(Leader)'}
          </Typography>
        </Box>
        <Box display='flex' alignItems='center' gap={0.5} color='GrayText'>
          <AccessTime fontSize='small' />
          <Typography variant='body2'>
            {createdAt && createdAt.toDate().toDateString()}
          </Typography>
        </Box>
        <IconButton
          aria-label='reply to post'
          onClick={() => setAddReply(true)}
        >
          <Reply />
        </IconButton>
        {canDelete && (
          <IconButton aria-label='delete' onClick={onDelete}>
            <Delete />
          </IconButton>
        )}
      </Box>
      <Box mt={2} ml={4}>
        {replies &&
          replies.length > 0 &&
          replies.map(
            ({ replyId, content, authorName, createdAt, authorId }) => (
              <ReplyItem
                key={replyId}
                content={content}
                name={authorName}
                createdAt={createdAt}
                canDelete={authorId === currentAuthUid}
                onDelete={() => onDeleteReply(postId, replyId)}
                isLeader={isLeader}
              />
            )
          )}
      </Box>
      {addReply && (
        <CreateReply
          onAddReply={onAddReply}
          postId={postId}
          isLeader={isLeader}
        />
      )}
    </Box>
  );
}

export default PostItem;
