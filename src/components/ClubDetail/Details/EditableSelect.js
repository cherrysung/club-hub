import * as React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  FormControl,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import {
  CAS_CATEGORIES,
  ACTIVITY_CATEGORIES,
  RELEVANT_SUBJECT_CATEGORIES,
} from "../lib/constants";
import FormSelectField from "./FormSelectField"; // Make sure to import the FormSelectField component

function EditableSelect({ value, onSave }) {
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
          <FormControl>
            <FormSelectField
              label="CAS Requirements"
              options={CAS_CATEGORIES}
              value={newValue["CAS Requirements"]}
              onChange={(e) => {
                setNewValue({
                  ...newValue,
                  "CAS Requirements": e.target.value,
                });
              }}
            />
            <FormSelectField
              label="Type of Activity"
              options={ACTIVITY_CATEGORIES}
              value={newValue["Type of Activity"]}
              onChange={(e) => {
                setNewValue({
                  ...newValue,
                  "Type of Activity": e.target.value,
                });
              }}
            />
            <FormSelectField
              label="Relevant Subject"
              options={RELEVANT_SUBJECT_CATEGORIES}
              value={newValue["Relevant Subject"]}
              onChange={(e) => {
                setNewValue({
                  ...newValue,
                  "Relevant Subject": e.target.value,
                });
              }}
            />
          </FormControl>
          <Box display="flex" justifyContent="flex-end" paddingTop={1}>
            <Button onClick={handleSave}>Save</Button>
          </Box>
        </Box>
      ) : (
        <>
          <Typography>{value}</Typography>
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

export default EditableSelect;
