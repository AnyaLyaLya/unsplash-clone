import { createTheme } from "@mui/material";

export const formTheme = createTheme({
  typography: {
    htmlFontSize: 18,
    fontFamily: [
      'Mont',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: 32,
    },
    body1: {
      fontSize: 16,
    },
  },
  palette: {
    primary: {
      main: '#111',
    },
    secondary: {
      main: '#111',
    },
  },
  shape: {
    borderRadius: 25,
  },
});