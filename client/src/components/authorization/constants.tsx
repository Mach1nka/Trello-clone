import React, { Dispatch, SetStateAction } from 'react';

import SignUp from './components/sign-up';
import LogIn from './components/log-in';

export interface Props {
  setBackdropView: Dispatch<SetStateAction<boolean>>;
}

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
    component: (props: Props): JSX.Element => <SignUp {...props} />
  },
  {
    value: '2',
    label: 'Log In',
    component: (props: Props): JSX.Element => <LogIn {...props} />
  }
];

export { registrationFields, loginFields, authForms };
