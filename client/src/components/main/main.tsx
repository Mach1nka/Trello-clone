import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BoardsList from '../boards-page/boards-list';
import ColumnsContainer from '../columns/columns-container';
import Header from '../header/header';

const Main: React.FC = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/boards" component={BoardsList} />
      <Route path="/boards/board/:boardId" component={ColumnsContainer} />
    </Switch>
  </>
);

export default Main;
