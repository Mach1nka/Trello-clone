import { createMuiTheme } from '@material-ui/core';

const defaultColorsMU = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#0079bf',
      dark: '#002884',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#ff1744',
      dark: '#ba000d',
      contrastText: '#000'
    }
  }
});

export { defaultColorsMU };
