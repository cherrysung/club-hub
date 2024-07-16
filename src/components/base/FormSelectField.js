import { MenuItem, TextField } from '@mui/material';

const FormSelectField = ({
  label,
  value,
  onChange,
  options,
  size = 'small',
  required = false,
  error,
  defaultValue,
  nullable = false,
}) => {
  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={onChange}
      size={size}
      required={required}
      error={error}
      defaultValue={defaultValue}
    >
      {nullable && (
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
      )}
      {options.map(({ label, value }) => (
        <MenuItem value={value} key={value}>
          {label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FormSelectField;
