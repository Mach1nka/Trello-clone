import React from 'react';
import { TextField, Button } from '@material-ui/core';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/actions/auth-action';

type FormikProps = {
  [key: string]: string;
};

const formStyles: React.CSSProperties = {
  height: '100%',
  marginTop: '7%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const textFieldOptions = [
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

const SignUp = (): JSX.Element => {
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    login: yup
      .string()
      .strict()
      .trim('Login cannot include leading and trailing spaces')
      .min(5, 'Login must be more than 5 symbols')
      .required('Login is required')
      .matches(/^[a-zA-Z0-9]+$/, 'Login must have numbers and letters'),
    password: yup
      .string()
      .strict()
      .trim('Login cannot include leading and trailing spaces')
      .required('Password is required')
      .min(6, 'Login must be more than 6 symbols')
      .matches(/^[a-zA-Z0-9]+$/, 'Password must have numbers and letters'),
    confirmPassword: yup
      .string()
      .required('Password is required')
      .oneOf([yup.ref('password')], 'Passwords does not match')
  });
  const initialValues: FormikProps = {
    login: '',
    password: '',
    confirmPassword: ''
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(registerUser({ login: values.login, password: values.password }));
    }
  });
  return (
    <form style={formStyles} onSubmit={formik.handleSubmit} autoComplete="off">
      <div>
        {textFieldOptions.map((el) => (
          <TextField
            key={el.id}
            size="medium"
            margin="normal"
            variant="outlined"
            fullWidth
            id={el.id}
            name={el.id}
            label={el.label}
            type={el.type}
            autoFocus={el.autoFocus}
            onChange={formik.handleChange}
            error={formik.touched[el.id] && !!formik.errors[el.id]}
            helperText={formik.touched[el.id] && formik.errors[el.id]}
          />
        ))}
      </div>
      <Button size="large" type="submit" fullWidth color="secondary" variant="contained">
        submit
      </Button>
    </form>
  );
};

export default SignUp;
