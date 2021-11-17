import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { AuthContext } from 'context/AuthContext';
import { httpService } from 'services/HttpService';

export const withUser = (WrappedComponent: NextPage<any>) => (props: any) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [renderComponent, setRenderComponent] = useState<JSX.Element>(<></>);
  console.log(user.token);

  useEffect(() => {
    if (!user.token || !httpService.getAuthToken()) {
      setRenderComponent(<></>);
      router.push('/login');
    } else {
      setRenderComponent(<WrappedComponent {...props} />);
    }
  }, []);

  return renderComponent;
};
