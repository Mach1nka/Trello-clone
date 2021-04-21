import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { useAppSelector } from '../../store/hooks';
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

const App = (): JSX.Element => {
  const { token } = useAppSelector((state) => state.authData);
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/">
            <div>Hello</div>
          </Route>
          <Route path="/auth">
            <Authorization />
          </Route>
          {!token && <Redirect to="/auth" />}
        </Switch>
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
