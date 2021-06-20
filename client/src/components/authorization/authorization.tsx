import React, { useEffect, useState } from 'react';
import { Paper, Container, Tab, Backdrop, CircularProgress } from '@material-ui/core';
import { TabPanel, TabList, TabContext } from '@material-ui/lab/';
import { useAppSelector } from '../../store/hooks';
import ErrorModal from './error-modal';
import { authForms, useStyles } from './constants';

const Authorization: React.FC = () => {
  const [tabIndex, setTabIndex] = useState('1');
  const [isOpenBackdrop, setBackdropView] = useState(false);
  const classes = useStyles();
  const [isOpenModal, setModalView] = useState(false);
  const { message } = useAppSelector((state) => state.authData);

  useEffect(() => (message ? setModalView(true) : setModalView(false)), [message]);

  return (
    <>
      <Container maxWidth="xs">
        <ErrorModal
          setBackdropView={setBackdropView}
          isOpen={isOpenModal}
          setModalView={setModalView}
          errorText={message}
        />
        <Paper elevation={6} className={classes.paper}>
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
                {el.component({ setBackdropView })}
              </TabPanel>
            ))}
          </TabContext>
        </Paper>
      </Container>
      <Backdrop className={classes.backdrop} open={isOpenBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Authorization;
