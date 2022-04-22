import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { PrivateRouteState } from './types';

const AuthProtect: React.FC = () => {
  const { token }: PrivateRouteState = useSelector((state) => state.authData);

  return token ? <Outlet /> : <Navigate to="/auth" />;
};

export default AuthProtect;
