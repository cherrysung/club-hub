import * as React from 'react';
import { useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import FormSelectField from '../../base/FormSelectField';

function EditableSelect({ value, onSave, options }) {
  const [editing, setEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleSave = async () => {
    try {
      if (newValue === value) return;
      await onSave(newValue);
    } finally {
      setEditing(false);
    }
  };

  return (
    <>
      {editing ? (
        <Box display='flex' flexDirection='column'>
          <FormSelectField
            options={options}
            value={newValue}
            onChange={(e) => {
              setNewValue(e.target.value);
            }}
          />
          <Box display='flex' justifyContent='flex-end' paddingTop={1}>
            <Button onClick={handleSave}>Save</Button>
          </Box>
        </Box>
      ) : (
        <>
          <Typography>{value}</Typography>
          <IconButton
            onClick={() => setEditing(true)}
            sx={{ position: 'absolute', top: 0, right: 0 }}
          >
            <Edit />
          </IconButton>
        </>
      )}
    </>
  );
}

export default EditableSelect;
