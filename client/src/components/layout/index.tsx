import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';

import Header from './header/header';
import GlobalLoader from '../global-loader';
import Alerts from '../alerts';

const Layout: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      {location.pathname !== '/auth' ? <Header /> : null}
      <Outlet />
      <GlobalLoader />
      <Alerts />
    </ThemeProvider>
  );
};

export default Layout;
