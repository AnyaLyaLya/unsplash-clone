import { createTheme } from '@mui/material/styles';

export const button = createTheme({
  typography: {
    htmlFontSize: 20,
    fontFamily: [
      'BlinkMacSystemFont',
      'sans-serif',
    ].join(','),
    body1: {
      fontSize: 20,
    },
    body2: {
      fontSize: 20,
    },
  },
  palette: {
    primary: {
      main: '#111',
    },
    secondary: {
      main: '#fff',
    },
  },
  shape: {
    borderRadius: 15,
  },
});