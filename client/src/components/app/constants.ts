import { createMuiTheme } from '@material-ui/core';

const defaultColorsMU = createMuiTheme({
  palette: {
    primary: {
      main: '#929DAF',
      contrastText: '#1A1A21'
    },
    secondary: {
      main: '#1A1A21',
      contrastText: '#1A1A21'
    },
    warning: {
      main: '#FBEABE'
    },
    error: {
      main: '#d83a38'
    }
  }
});

export { defaultColorsMU };
