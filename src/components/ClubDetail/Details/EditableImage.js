import { Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
} from '@mui/material';
import { useRef, useState } from 'react';

const FILE_SIZE_LIMIT = 1024 * 1024 * 5; // 5MB

function Editableimage({ src, onEdit }) {
  const [imageSrc, setImage] = useState(src);
  const [newFile, setNewFile] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleClickFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > FILE_SIZE_LIMIT) {
        alert('File size should be less than 5MB');
      } else if (!file.type.startsWith('image/')) {
        alert('Not an image file');
      } else {
        setImage(URL.createObjectURL(file));
        setNewFile(file);
      }
    }
  };

  const handleCancel = () => {
    setNewFile(null);
    setImage(src);
  };

  const handleSave = async () => {
    if (!newFile) return;

    try {
      setNewFile(null);
      setLoading(true);
      await onEdit(newFile);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        maxHeight: 350,
        position: 'relative',
      }}
    >
      <img
        src={imageSrc}
        alt='club'
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {newFile ? (
        <Stack
          spacing={2}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <Button size='small' variant='contained' onClick={handleSave}>
            Save
          </Button>
          <Button
            size='small'
            variant='contained'
            color='warning'
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Stack>
      ) : (
        <IconButton
          onClick={handleClickFileInput}
          color='primary'
          sx={{ position: 'absolute', top: 1, right: 1 }}
        >
          <Edit />
        </IconButton>
      )}
      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none ' }}
      />
    </Box>
  );
}

export default Editableimage;
