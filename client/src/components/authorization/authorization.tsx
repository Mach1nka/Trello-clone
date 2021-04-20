import React, { useEffect, useState } from 'react';
import { Paper, Container, Tab } from '@material-ui/core';
import { TabPanel, TabList, TabContext } from '@material-ui/lab/';
import { useAppSelector } from '../../store/hooks';
import SignUp from './sign-up';
import LogIn from './log-in';
import ErrorModal from './error-modal';

const Authorization = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState('1');
  const [isOpenModal, setModalView] = useState(false);
  const { message } = useAppSelector((state) => state.authData);

  const authForms = [
    {
      value: '1',
      label: 'Log In',
      component: <SignUp />
    },
    {
      value: '2',
      label: 'Sign Up',
      component: <LogIn />
    }
  ];

  useEffect(() => (message ? setModalView(true) : setModalView(false)), [message]);

  return (
    <Container maxWidth="xs">
      <ErrorModal isOpen={isOpenModal} setModalView={setModalView} errorText={message} />
      <Paper elevation={6} style={{ width: 'inherit', height: '500px' }}>
        <TabContext value={tabIndex}>
          <TabList
            onChange={(_evt, index: number) => setTabIndex(`${index}`)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {authForms.map((el) => (
              <Tab key={el.value} label={el.label} value={el.value} />
            ))}
          </TabList>
          {authForms.map((el) => (
            <TabPanel key={el.value} style={{ height: '65%' }} value={el.value}>
              {el.component}
            </TabPanel>
          ))}
        </TabContext>
      </Paper>
    </Container>
  );
};

export default Authorization;
