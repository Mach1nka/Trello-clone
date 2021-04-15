import React, { useState } from 'react';
import { Paper, Container, Tab } from '@material-ui/core';
import { TabPanel, TabList, TabContext } from '@material-ui/lab/';
import SignUp from './sign-up';

const Authorization = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState('1');
  return (
    <Container maxWidth="xs">
      <Paper elevation={6} style={{ width: 'inherit', height: '500px' }}>
        <TabContext value={tabIndex}>
          <TabList
            onChange={(evt, index: number) => setTabIndex(`${index}`)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Sign Up" value="1" />
            <Tab label="Log In" value="2" />
          </TabList>
          <TabPanel style={{ height: '65%' }} value="1">
            <SignUp />
          </TabPanel>
          <TabPanel value="2" />
        </TabContext>
      </Paper>
    </Container>
  );
};

export default Authorization;
