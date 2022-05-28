import React from 'react';
import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import dispatchEntityHelper from '../../utils/dispatch-entity-helper';
import { useAppDispatch } from '../../store';
import { loginUser } from '../../service/resources/requests/auth';
import { AuthorizationSC as SC } from './sc';
import { loginFields } from './constants';
import { SliceName } from '../../service/resources/models/common.model';
import { AuthThunkAction, UserCredentials } from '../../service/resources/models/auth.model';

type FormikProps = {
  [key: string]: string;
};

const LogIn: React.FC = () => {
  const dispatch = useAppDispatch();

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
      .matches(/^[a-zA-Z0-9]+$/, 'Password must have numbers and letters')
  });

  const initialValues: UserCredentials & FormikProps = {
    login: '',
    password: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async ({ login, password }) => {
      await dispatchEntityHelper({
        sliceName: SliceName.Auth,
        actionType: AuthThunkAction.Authenticate,
        fetchData: { login, password },
        withLoading: true,
        dispatch,
        fetchFn: loginUser
      });
    }
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
