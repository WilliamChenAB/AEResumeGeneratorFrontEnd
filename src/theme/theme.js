import { createTheme } from '@mui/material';
import { colorToken } from './colorToken';

export const theme = createTheme({
  palette: {
    primary: {
      light: colorToken.brand.aeBlueLight,
      main: colorToken.brand.aeBlue,
      dark: colorToken.brand.aeBlueDark,
    },
    secondary: {
      light: colorToken.brand.aeGreenLight,
      main: colorToken.brand.aeGreen,
      dark: colorToken.brand.aeGreenDark,
    },
    checkbox: {
      main: colorToken.greyPalette.white,
    } 
  },
  typography: {
    h1: {
      fontSize: 24,
      fontWeight: 600,
      color: colorToken.brand.aeBlue,
    }, 
    h2: {
      fontSize: 20,
      fontWeight: 500,
      color: colorToken.brand.aeBlue,
    },
    h3: {
      fontSize: 18,
      fontWeight: 600,
      color: colorToken.brand.aeBlue,
    },
    subtitle1: {
      fontSize: 18,
      color: colorToken.brand.aeBlue,
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    subtitle3: {
      fontSize: 14,
      fontWeight: 500,
    },
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 14,
    },
    button: {
      fontSize: 16,
      fontWeight: 500,
    },
  }
});
