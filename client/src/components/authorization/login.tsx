import React from 'react';
import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';

import dispatchEntityHelper from '../../utils/dispatch-entity-helper';
import { useAppDispatch } from '../../store';
import { AuthorizationSC as SC } from './sc';
import { loginFields } from './constants';
import { loginUser } from '../../service/resources/requests/auth';
import { SliceName } from '../../service/resources/models/common.model';
import { AuthThunkAction } from '../../service/resources/models/auth.model';
import { initialValues, validationSchema } from '../../schemas/auth/login';

const LogIn: React.FC = () => {
  const dispatch = useAppDispatch();

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
