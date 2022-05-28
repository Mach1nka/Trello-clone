import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectAuthData } from '../../store/selectors';

const AuthProtect: React.FC = () => {
  const { isLoggedIn } = useSelector(selectAuthData);

  return isLoggedIn ? <Outlet /> : <Navigate to="/auth" />;
};

export default AuthProtect;
