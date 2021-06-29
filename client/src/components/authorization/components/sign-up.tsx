import React from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { registerUser } from '../../../store/auth/actions';
import { AuthorizationSC as SC } from '../sc';
import { registrationFields, Props } from '../constants';

type FormikProps = {
  [key: string]: string;
};

const SignUp: React.FC<Props> = ({ setBackdropView }) => {
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
      setBackdropView(true);
      dispatch(registerUser({ login: values.login, password: values.password }));
    }
  });

  return (
    <SC.SignUpForm onSubmit={formik.handleSubmit} autoComplete="off">
      <div>
        {registrationFields.map((el) => (
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
      <SC.SubmitButton size="large" type="submit" fullWidth variant="contained">
        submit
      </SC.SubmitButton>
    </SC.SignUpForm>
  );
};

export default SignUp;
