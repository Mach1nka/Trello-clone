import { useContext } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';
import { useTheme } from '@material-ui/core';

import { AuthContext } from 'context/AuthContext';
import { InformationAlert } from '../informationAlert';
import { Header } from './header';
import { Loader } from '../loader';

export const Layout: React.FC = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { pathname } = useRouter();
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      {pathname == '/login' || !user.token ? null : <Header />}
      {children}
      <InformationAlert />
      <Loader />
    </ThemeProvider>
  );
};
