import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { PrivateRouteState } from './types';
import { useAppSelector } from '../../store/hooks';

const AuthProtect: React.FC = () => {
  const { token }: PrivateRouteState = useAppSelector((state) => state.authData);

  return token ? <Outlet /> : <Navigate to="/auth" />;
};

export default AuthProtect;
