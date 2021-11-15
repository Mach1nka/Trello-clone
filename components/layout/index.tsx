import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';
import { useTheme } from '@material-ui/core';

import { InformationAlert } from '../informationAlert';
import { Header } from './header';
import { Loader } from '../loader';

export const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      {pathname !== '/login' ? <Header /> : null}
      {children}
      <InformationAlert />
      <Loader />
    </ThemeProvider>
  );
};
