import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BoardsList from '../boards-list/boards-list';

const Main: React.FC = () => (
  <Switch>
    <Route path="/boards" component={BoardsList} />
    <Route path="/boards/board:id" render={() => <div>span</div>} />
  </Switch>
);

export default Main;
