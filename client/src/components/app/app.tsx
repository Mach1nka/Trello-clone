import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import { useAppSelector } from '../../store/hooks';
import Authorization from '../authorization/authorization';
import Main from '../main/main';
import { defaultColorsMU } from './constants';

const App: React.FC = () => {
  const { token } = useAppSelector((state) => state.authData);
  return (
    <Router>
      <MuiThemeProvider theme={defaultColorsMU}>
        <Switch>
          <Route
            exact
            path={['/', '/boards']}
            render={() => (token ? <Main /> : <Redirect to="/auth" />)}
          />
          <Route path="/auth" render={() => (!token ? <Authorization /> : <Redirect to="/" />)} />
        </Switch>
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
