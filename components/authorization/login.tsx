import { useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { loginUser } from 'store/auth/action';
import { AuthorizationSC as SC } from './sc';
import { loginFields, Props } from './constant';

type FormikProps = {
  [key: string]: string;
};

export const LogIn: React.FC<Props> = ({ setBackdropView }) => {
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
  });

  const initialValues: FormikProps = {
    login: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setBackdropView(true);
      dispatch(loginUser({ login: values.login, password: values.password }));
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
