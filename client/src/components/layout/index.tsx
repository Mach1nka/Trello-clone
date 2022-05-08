import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';

import { useAppSelector } from '../../store/hooks';
import Header from './header/header';
// import { saveAuthDataToLocalStorage } from '../../../utils/token-managment';

const Main: React.FC = () => {
  const { authData } = useAppSelector((state) => state);
  const theme = useTheme();

  useEffect(() => {
    saveAuthDataToLocalStorage(authData);
  }, [authData.login]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Outlet />
    </ThemeProvider>
  );
};

export default Main;
