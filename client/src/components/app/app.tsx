import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Authorization from '../authorization/authorization';

const theme = createMuiTheme({
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

const App = (): JSX.Element => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <Authorization />
    </MuiThemeProvider>
  </Router>
);

export default App;
