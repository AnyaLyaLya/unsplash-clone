import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
  typography: {
    htmlFontSize: 18,
    fontFamily: [
      'BlinkMacSystemFont',
      'sans-serif',
    ].join(','),
    body1: {
      fontSize: 14,
    },
  },
  palette: {
    primary: {
      main: '#111',
    },
    secondary: {
      main: '#767676',
    },
  },
  shape: {
    borderRadius: 25,
  },
});