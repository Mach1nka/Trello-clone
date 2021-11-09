import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import { createGlobalStyle } from 'styled-components';
import AuthProvider from 'context/AuthContext';
import AlertProvider from 'context/AlertContext';

import { defaultColors } from 'styles/theme';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #47b49d;
  }
`;

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Trello clone</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={defaultColors}>
        <GlobalStyle />
        <AlertProvider>
          <AuthProvider>
            <Component {...pageProps} />
            
          </AuthProvider>
        </AlertProvider>  
      </ThemeProvider>
    </>
  );
};

export default App;
