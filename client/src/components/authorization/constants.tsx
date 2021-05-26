import { makeStyles } from '@material-ui/core';
import React from 'react';
import SignUp from './sign-up';
import LogIn from './log-in';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 'inherit',
    height: '500px',
    marginTop: '30%'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  }
}));

const registrationFields = [
  {
    id: 'login',
    type: 'text',
    label: 'Login',
    autoFocus: true
  },
  {
    id: 'password',
    type: 'password',
    label: 'Password'
  },
  {
    id: 'confirmPassword',
    type: 'password',
    label: 'Confirm password'
  }
];

const loginFields = [
  {
    id: 'login',
    type: 'text',
    label: 'Login',
    autoFocus: true
  },
  {
    id: 'password',
    type: 'password',
    label: 'Password'
  }
];

const authForms = [
  {
    value: '1',
    label: 'Sign Up',
    component: <SignUp />
  },
  {
    value: '2',
    label: 'Log In',
    component: <LogIn />
  }
];

export { registrationFields, loginFields, authForms, useStyles };
