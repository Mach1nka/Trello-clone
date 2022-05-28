import * as yup from 'yup';

import { UserCredentials } from '../../service/resources/models/auth.model';

export type FormikProps = {
  [key: string]: string;
};

const initialValues: UserCredentials & FormikProps = {
  login: '',
  password: ''
};

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

export { validationSchema, initialValues };
