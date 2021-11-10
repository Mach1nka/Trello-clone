import { useContext } from 'react';
import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { AuthorizationSC as SC } from './sc';
import { registrationFields } from './constant';
import { registerUser } from 'services/resources/request/auth';
import { UserData, AuthActions } from 'services/resources/model/auth.model';
import { AlertActions, AlertStatusData } from 'context/AlertContext';
import { AuthContext } from 'context/AuthContext';
import { AlertContext } from 'context/AlertContext';
import { LoaderContext } from 'context/LoaderContext';
import { ErrorInfo } from 'services/HttpService/utils';

type FormikProps = {
  [key: string]: string;
};

export const SignUp: React.FC = () => {
  const { dispatch: authDispatch } = useContext(AuthContext);
  const { dispatch: alertDispatch, alerts } = useContext(AlertContext);
  const { setLoaderState } = useContext(LoaderContext);

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
      .oneOf([yup.ref('password')], 'Passwords does not match'),
  });

  const initialValues: UserData & { confirmPassword: string } & FormikProps = {
    login: '',
    password: '',
    confirmPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // @note context Loader
      registerUser({ login: values.login, password: values.password })
        .then((resp) => {
          authDispatch({ type: AuthActions.LOG_IN, payload: resp.data });
        })
        .catch((err: ErrorInfo) => {
          alertDispatch({
            type: AlertActions.ADD,
            payload: {
              id: alerts.length,
              message: err.message,
              status: AlertStatusData.ERROR,
            },
          });
        })
        .finally(() => setLoaderState(false));
    },
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
