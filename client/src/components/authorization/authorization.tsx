import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Tab, useTheme } from '@material-ui/core';
import { TabPanel, TabList, TabContext } from '@material-ui/lab/';
import { ThemeProvider } from 'styled-components';

import { authForms } from './constants';
import { AuthorizationSC as SC } from './sc';
import { selectAuthData } from '../../store/selectors';
import { getToken } from '../../service/resources/localStorage/token';
import dispatchEntityHelper from '../../utils/dispatch-entity-helper';
import { useAppDispatch } from '../../store';
import { getUserInfo } from '../../service/resources/requests/user';
import { SliceName } from '../../service/resources/models/common.model';
import { AuthThunkAction } from '../../service/resources/models/auth.model';

const Authorization: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useSelector(selectAuthData);
  const [tabIndex, setTabIndex] = useState('1');
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
      return;
    }

    const authenticateIfTokenExist = async () => {
      const token = getToken();

      if (token) {
        await dispatchEntityHelper({
          sliceName: SliceName.Auth,
          actionType: AuthThunkAction.Authenticate,
          fetchData: {},
          withLoading: true,
          dispatch,
          fetchFn: getUserInfo
        });
      }
    };
    authenticateIfTokenExist();
  }, [isLoggedIn]);

  const onChange = useCallback(
    (_evt: React.ChangeEvent<Record<string, unknown>>, index: number) => setTabIndex(`${index}`),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <SC.Paper elevation={6}>
          <TabContext value={tabIndex}>
            <TabList onChange={onChange} indicatorColor="primary" textColor="primary" centered>
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
        </SC.Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Authorization;
