import { ThemeProvider } from 'styled-components';
import { useTheme } from '@material-ui/core';

import { InformationAlert } from '../informationAlert';
import { Loader } from '../loader';

export const Layout: React.FC = ({ children }) => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      {children}
      <InformationAlert />
      <Loader />
    </ThemeProvider>
  );
};
