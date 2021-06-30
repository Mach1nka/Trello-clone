import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

import BoardsList from '../boards-page/boards-list';
import ColumnsContainer from '../columns/columns-container';
import Header from '../header/header';
import PrivateRoute from '../routing/private-route';
import { saveAuthDataToLocalStorage } from '../../../utils/auth-data-localstorage';

const Main: React.FC = () => {
  const { authData } = useAppSelector((state) => state);

  useEffect(() => {
    saveAuthDataToLocalStorage(authData);
  }, [authData.login]);
  return (
    <>
      <Header />
      <Switch>
        <PrivateRoute exact path="/boards" component={BoardsList} />
        <PrivateRoute exact={false} path="/boards/board/:boardId" component={ColumnsContainer} />
      </Switch>
    </>
  );
};

export default Main;
