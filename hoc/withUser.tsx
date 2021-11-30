import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

import { AuthContext } from 'context/AuthContext';
import { AuthData } from 'services/resources/model/auth.model';

export const withUser = (WrappedComponent: NextPage<any>) => (props: any) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [renderComponent, setRenderComponent] = useState<JSX.Element>(<></>);

  const authDataJson = getCookie('authData');
  const authData: AuthData | null =
    authDataJson && JSON.parse(authDataJson.toString());

  useEffect(() => {
    if (!user.token && !authData) {
      setRenderComponent(<></>);
      router.push('/login');
    } else {
      setRenderComponent(<WrappedComponent {...props} />);
    }
  }, [user.token]);

  return renderComponent;
};
