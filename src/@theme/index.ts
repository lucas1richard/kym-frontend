import { DefaultTheme } from 'styled-components';
import { green, grey } from './colors';
import { createMuiTheme, Theme } from './styles';

export type ThemePaletteColors =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'success'
  | 'default';

const theme: DefaultTheme = createMuiTheme({
  palette: {
    success: {
      main: green[600],
      dark: green[700],
      light: green[500],
      contrastText: '#ffffff',
    },
    default: {
      main: grey[800],
      dark: grey[900],
      light: grey[500],
      contrastText: '#ffffff',
    },
  }
});

console.log(theme);

export default theme;
