import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { PrivateRouteProps, PrivateRouteState } from './types';
import { useAppSelector } from '../../store/hooks';

const PrivateRoute = ({ exact, component: Component, ...rest }: PrivateRouteProps): JSX.Element => {
  const { token }: PrivateRouteState = useAppSelector((state) => state.authData);

  return (
    <Route
      {...rest}
      render={(props) => (token ? <Component {...props} /> : <Redirect to="/auth" />)}
    />
  );
};

export default PrivateRoute;
