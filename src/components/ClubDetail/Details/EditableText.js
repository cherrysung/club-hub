import { Edit } from "@mui/icons-material";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";

function EditableText({ value, onSave, multiline }) {
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
        <Box display="flex" flexDirection="column">
          <TextField
            fullWidth
            multiline={multiline}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <Box display="flex" justifyContent="flex-end" paddingTop={1}>
            <Button onClick={handleSave}>Save</Button>
          </Box>
        </Box>
      ) : (
        <>
          <Box>
            {value.split("\n").map((line, index) => (
              <Typography key={index}>{line}</Typography>
            ))}
          </Box>{" "}
          <IconButton
            onClick={() => setEditing(true)}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <Edit />
          </IconButton>
        </>
      )}
    </>
  );
}

export default EditableText;
