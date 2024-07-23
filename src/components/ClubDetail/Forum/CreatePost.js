import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { useState } from 'react';

function CreatePost() {
  const [content, setContent] = useState('');
  const [isAnon, setAnon] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(content);
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      display='flex'
      alignItems='flex-start'
      gap={1}
      sx={{ '& .MuiTextField-root': { flexGrow: 1 } }}
    >
      <TextField
        size='small'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        multiline
      />
      <Button type='submit' variant='contained' color='primary'>
        Post
      </Button>

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
    </Box>
  );
}

export default CreatePost;
