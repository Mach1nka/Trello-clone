import { useContext } from 'react';
import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { AuthorizationSC as SC } from './sc';
import { loginFields } from './constant';
import { loginUser } from 'services/resources/request/auth';
import { UserData, AuthActions } from 'services/resources/model/auth.model';
import { AlertActions, AlertStatusData } from 'context/AlertContext';
import { AuthContext } from 'context/AuthContext';
import { AlertContext } from 'context/AlertContext';
import { LoaderContext } from 'context/LoaderContext';
import { ErrorInfo } from 'services/HttpService/types';

type FormikProps = {
  [key: string]: string;
};

export const LogIn: React.FC = () => {
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
  });

  const initialValues: UserData & FormikProps = {
    login: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setLoaderState(true);
      loginUser(values)
        .then((resp) => {
          authDispatch({ type: AuthActions.LOG_IN, payload: resp.data });
        })
        .catch((err: ErrorInfo) => {
          setLoaderState(false);
          alertDispatch({
            type: AlertActions.ADD,
            payload: {
              id: alerts.length,
              message: err.message,
              status: AlertStatusData.ERROR,
            },
          });
        });
    },
  });

  return (
    <SC.LogInForm onSubmit={formik.handleSubmit} autoComplete="off">
      <div>
        {loginFields.map((el) => (
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
    </SC.LogInForm>
  );
};

export default LogIn;
