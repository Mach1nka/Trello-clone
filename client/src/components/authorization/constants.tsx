import React from 'react';
import SignUp from './sign-up';
import LogIn from './log-in';

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

export { registrationFields, loginFields, authForms };
