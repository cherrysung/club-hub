import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { useState } from 'react';

function CreateReply({ onAddReply, postId, isLeader }) {
  const [content, setContent] = useState('');
  const [isAnon, setAnon] = useState(false);

  const handleAddReply = async (e) => {
    e.preventDefault();
    await onAddReply(postId, content, isAnon);
    setContent('');
  };

  return (
    <Box
      component='form'
      onSubmit={handleAddReply}
      display='flex'
      alignItems='flex-start'
      gap={1}
      mt={2}
      ml={4}
    >
      <TextField
        value={content}
        onChange={(e) => setContent(e.target.value)}
        size='small'
        variant='outlined'
        multiline
        sx={{ flex: 1 }}
      />
      <Button type='submit' variant='contained'>
        Reply
      </Button>
      {!isLeader && (
        <FormControlLabel
          label='Post Anonymous'
          slotProps={{
            typography: {
              variant: 'body2',
              color: isAnon ? 'unset' : 'GrayText',
            },
          }}
          control={
            <Checkbox
              disableRipple
              checked={isAnon}
              onChange={() => setAnon(!isAnon)}
              sx={{ paddingRight: '2px', color: 'GrayText' }}
            />
          }
        />
      )}
    </Box>
  );
}

export default CreateReply;
