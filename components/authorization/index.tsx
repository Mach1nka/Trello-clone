import { useEffect, useState, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { Container, Tab } from '@material-ui/core';
import { TabPanel, TabList, TabContext } from '@material-ui/lab/';
import { setCookies } from 'cookies-next';

import { LoaderContext } from 'context/LoaderContext';
import { AuthContext } from 'context/AuthContext';
import { authForms } from './constant';
import { AuthorizationSC as SC } from './sc';
import { useLogout } from 'utils/logout';

export const Authorization: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { setLoaderState } = useContext(LoaderContext);

  const [tabIndex, setTabIndex] = useState('1');

  const router = useRouter();
  const { logout } = useLogout();

  useEffect(() => {
    logout();
    setLoaderState(false);
  }, []);

  useEffect(() => {
    if (user.token) {
      setCookies('authData', user, { maxAge: 60 * 10 });
      router.push({
        pathname: '/boards',
      });
    }
  }, [user.token]);

  const onChange = useCallback(
    (_evt: React.ChangeEvent<Record<string, unknown>>, index: number) =>
      setTabIndex(`${index}`),
    []
  );

  return (
    <Container maxWidth="xs">
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
          {authForms.map(({ value, component: Component }) => (
            <TabPanel key={value} style={{ height: '65%' }} value={value}>
              <Component />
            </TabPanel>
          ))}
        </TabContext>
      </SC.Paper>
    </Container>
  );
};
