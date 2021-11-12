import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { AuthContext } from 'context/AuthContext';

export const withUser = (WrappedComponent: NextPage<any>) => (props: any) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [renderComponent, setRenderComponent] = useState<JSX.Element>(<></>);

  useEffect(() => {
    if (!user.token) {
      router.push('/login');
      setRenderComponent(<></>);
    } else {
      setRenderComponent(<WrappedComponent {...props} />);
    }
  }, []);

  return renderComponent;
};
