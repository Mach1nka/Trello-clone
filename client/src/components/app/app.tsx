import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';

import Authorization from '../authorization/authorization';
import Main from '../main/main';
import ErrorBoundary from '../error-boundary/error-boundary';
import PrivateRoute from '../routing/private-route';
import { defaultColorsMU } from './constants';

const App: React.FC = () => (
  <Router>
    <ErrorBoundary>
      <MuiThemeProvider theme={defaultColorsMU}>
        <Switch>
          <PrivateRoute exact={false} path="/boards" component={Main} />
          <Route path="/auth" component={Authorization} />
          <Redirect from="/" to="/boards" />
        </Switch>
      </MuiThemeProvider>
    </ErrorBoundary>
  </Router>
);

export default App;
