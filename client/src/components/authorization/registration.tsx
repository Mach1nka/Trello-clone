import React from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';

import dispatchEntityHelper from '../../utils/dispatch-entity-helper';
import { signupUser } from '../../service/resources/requests/auth';
import { AuthorizationSC as SC } from './sc';
import { registrationFields } from './constants';
import { SliceName } from '../../service/resources/models/common.model';
import { AuthThunkAction } from '../../service/resources/models/auth.model';
import { initialValues, validationSchema } from '../../schemas/auth/registration';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();

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
        fetchFn: signupUser
      });
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
