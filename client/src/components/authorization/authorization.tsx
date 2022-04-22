import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Tab, CircularProgress, useTheme } from '@material-ui/core';
import { TabPanel, TabList, TabContext } from '@material-ui/lab/';
import { ThemeProvider } from 'styled-components';

// import ErrorModal from './components/error-modal';
import { authForms } from './constants';
import { AuthorizationSC as SC } from './sc';

const Authorization: React.FC = () => {
  const [tabIndex, setTabIndex] = useState('1');
  // const [isOpenModal, setModalView] = useState(false);
  const [isOpenBackdrop, setBackdropView] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    // if (message) {
    //   setModalView(true);
    // } else {
    //   setModalView(false);
    // }
    if (isLoggedIn) {
      navigate('/boards');
    }
  }, [isLoggedIn]);

  const onChange = useCallback(
    (_evt: React.ChangeEvent<Record<string, unknown>>, index: number) => setTabIndex(`${index}`),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        {/* <ErrorModal
          setBackdropView={setBackdropView}
          isOpen={isOpenModal}
          setModalView={setModalView}
          errorText=""
        /> */}
        <SC.Paper elevation={6}>
          <TabContext value={tabIndex}>
            <TabList onChange={onChange} indicatorColor="primary" textColor="primary" centered>
              {authForms.map((el) => (
                <Tab key={el.value} label={el.label} value={el.value} />
              ))}
            </TabList>
            {authForms.map((el) => (
              <TabPanel key={el.value} style={{ height: '65%' }} value={el.value}>
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

export default Authorization;
