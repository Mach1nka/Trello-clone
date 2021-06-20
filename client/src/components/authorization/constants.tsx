import React, { Dispatch, SetStateAction } from 'react';
import { makeStyles } from '@material-ui/core';
import SignUp from './sign-up';
import LogIn from './log-in';

export interface Props {
  setBackdropView: Dispatch<SetStateAction<boolean>>;
}

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
  },
  submitButton: {
    backgroundColor: 'rgba(240, 125, 57, 0.85)',
    '&:hover': {
      backgroundColor: theme.palette.warning.main
    }
  },
  errorButton: { color: '#f07d39' }
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
    component: (props: Props): JSX.Element => <SignUp {...props} />
  },
  {
    value: '2',
    label: 'Log In',
    component: (props: Props): JSX.Element => <LogIn {...props} />
  }
];

export { registrationFields, loginFields, authForms, useStyles };
