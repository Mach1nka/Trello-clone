import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useTheme } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';

import { useAppSelector } from '../../store/hooks';
import BoardsList from '../boards-page/boards-list';
import ColumnsContainer from '../columns/columns-container';
import Header from '../header/header';
import PrivateRoute from '../routing/private-route';
import { saveAuthDataToLocalStorage } from '../../../utils/auth-data-localstorage';

const Main: React.FC = () => {
  const { authData } = useAppSelector((state) => state);
  const theme = useTheme();
  useEffect(() => {
    saveAuthDataToLocalStorage(authData);
  }, [authData.login]);
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Switch>
        <PrivateRoute exact path="/boards" component={BoardsList} />
        <PrivateRoute exact={false} path="/boards/board/:boardId" component={ColumnsContainer} />
      </Switch>
    </ThemeProvider>
  );
};

export default Main;
