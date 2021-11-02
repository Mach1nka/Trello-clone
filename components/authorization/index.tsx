import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Container, Tab, CircularProgress, useTheme } from '@material-ui/core';
import { TabPanel, TabList, TabContext } from '@material-ui/lab/';
import { ThemeProvider } from 'styled-components';

import { useAppSelector } from 'store/hook';
import ErrorModal from './errorModal';
import { authForms } from './constant';
import { AuthorizationSC as SC } from './sc';

export const Authorization: React.FC = () => {
  const [tabIndex, setTabIndex] = useState('1');
  const [isOpenModal, setModalView] = useState(false);
  const [isOpenBackdrop, setBackdropView] = useState(false);

  const router = useRouter();
  const theme = useTheme();

  const { message, token } = useAppSelector((state) => state.authData);

  useEffect(() => {
    if (message) {
      setModalView(true);
    } else {
      setModalView(false);
    }
    if (token) {
      router.push('/boards');
    }
  }, [message, token]);

  const onChange = useCallback(
    (_evt: React.ChangeEvent<Record<string, unknown>>, index: number) =>
      setTabIndex(`${index}`),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <ErrorModal
          setBackdropView={setBackdropView}
          isOpen={isOpenModal}
          setModalView={setModalView}
          errorText={message}
        />
        <SC.Paper elevation={6}>
          <TabContext value={tabIndex}>
            <TabList
              onChange={onChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              {authForms.map((el) => (
                <Tab key={el.value} label={el.label} value={el.value} />
              ))}
            </TabList>
            {authForms.map((el) => (
              <TabPanel
                key={el.value}
                style={{ height: '65%' }}
                value={el.value}
              >
                {el.component({ setBackdropView })}
              </TabPanel>
            ))}
          </TabContext>
        </SC.Paper>
      </Container>
      <SC.Backdrop open={isOpenBackdrop}>
        <CircularProgress color="inherit" />
      </SC.Backdrop>
    </ThemeProvider>
  );
};
