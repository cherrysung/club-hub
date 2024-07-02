import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#15375e',
    },
    secondary: {
      main: '#DE352D',
    },
    error: {
      main: red.A400,
    },
    personalColor: {
      main: '#FF97CF',
      contrastText: '#fff',
    },
  },
});

export default theme;
