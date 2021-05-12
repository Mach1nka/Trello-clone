import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../header/header';
import BoardsList from '../boards-list/boards-list';

const Main: React.FC = () => (
  <div>
    <Header />
    <Switch>
      <Route path={['/', '/boards']} component={BoardsList} />
      <Route path="/boards/board" render={() => <div>span</div>} />
    </Switch>
  </div>
);

export default Main;
