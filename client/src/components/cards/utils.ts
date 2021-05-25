import { SchemaOf } from 'yup';
import * as yup from 'yup';

type Validation = {
  name: string;
  description: string | undefined;
};

const configValidationSchema: SchemaOf<Validation> = yup.object({
  name: yup
    .string()
    .strict()
    .trim('Name cannot include leading and trailing spaces')
    .min(2, 'Name must be more than 2 symbols')
    .max(30, 'Max length is 30 symbols')
    .required('New name is required')
    .matches(/^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/, 'New name must have numbers and letters'),
  description: yup
    .string()
    .strict()
    .trim('Description cannot include leading and trailing spaces')
    .max(150, 'Max length is 150 symbols')
    .matches(/^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/, 'New name must have numbers and letters')
});

export { configValidationSchema };
