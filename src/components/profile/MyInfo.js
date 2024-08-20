import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import HomeButton from '../base/HomeButton';
import { GRADE_ITEMS } from '../../lib/constants';

function formatDate(timestamp) {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

const MyInfo = ({ user, onSignout, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    grade: user.grade,
  });
  const [initialData] = useState(data);
  const [isInvalid, setInvalid] = useState({
    firstName: false,
    lastName: false,
    grade: false,
  });
  const [loading, setLoading] = useState(false);

  const handleClickEdit = () => setEditing(true);

  const handleCancel = () => {
    setData(initialData);
    setEditing(false);
  };

  const checkIsValid = () => {
    const firstNameExists = !!data.firstName;
    const lastNameExists = !!data.lastName;
    const gradeExists = !!data.grade;
    if (!firstNameExists || !lastNameExists || !gradeExists) {
      setInvalid({
        firstName: !firstNameExists,
        lastName: !lastNameExists,
        grade: !gradeExists,
      });
      return false;
    }

    setInvalid({
      firstName: false,
      lastName: false,
      grade: false,
    });
    return true;
  };

  const handleSave = async () => {
    const fields = Object.keys(data);
    const hasChanges = !fields.every(
      (field) => data[field] === initialData[field]
    );

    const isValid = checkIsValid();
    if (!isValid) return;

    if (hasChanges && isValid) {
      setLoading(true);
      await onSave(data);
    }
    setLoading(false);
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <Box sx={{ my: 4 }}>
        <Box display='flex' width='100%' justifyContent='space-between'>
          <HomeButton />
          <Button variant='contained' onClick={onSignout}>
            Sign out
          </Button>
        </Box>
      </Box>
      <Box sx={{ mb: 1 }} display='flex' justifyContent='space-between'>
        <Typography variant='h5'>My Info</Typography>
        {editing ? (
          <Box>
            <Button variant='outlined' sx={{ mr: 1 }} onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant='contained' onClick={handleSave}>
              {loading && (
                <CircularProgress
                  size={15}
                  color='inherit'
                  sx={{ marginRight: 1 }}
                />
              )}
              <span>Save</span>
            </Button>
          </Box>
        ) : (
          <Button variant='outlined' onClick={handleClickEdit}>
            Edit
          </Button>
        )}
      </Box>
      {user && (
        <Grid container spacing={1} columns={2}>
          <Grid item xs={2} sm={1}>
            {editing ? (
              <Box display='flex' gap={1}>
                <TextField
                  label='First name'
                  name='firstName'
                  value={data.firstName}
                  onChange={handleChange}
                  sx={{ flex: 1 }}
                  size='small'
                  required
                  error={isInvalid.firstName}
                />
                <TextField
                  label='Last name'
                  name='lastName'
                  value={data.lastName}
                  onChange={handleChange}
                  sx={{ flex: 1 }}
                  size='small'
                  required
                  error={isInvalid.lastName}
                />
              </Box>
            ) : (
              <Typography variant='body1' mt={1}>
                Name: {user.firstName} {user.lastName}
              </Typography>
            )}
          </Grid>
          <Grid item xs={2} sm={1}>
            <Typography variant='body1' mt={1}>
              Member Since: {formatDate(user.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={1}>
            {editing ? (
              <Select
                fullWidth
                size='small'
                label='Grade'
                value={data.grade}
                onChange={handleChange}
                error={isInvalid.grade}
              >
                {GRADE_ITEMS.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <Typography variant='body1' mt={1}>
                Grade: {user.grade}
              </Typography>
            )}
          </Grid>
          <Grid item xs={2} sm={1}>
            <Typography variant='body1' mt={1}>
              Email: {user.email}
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default MyInfo;
