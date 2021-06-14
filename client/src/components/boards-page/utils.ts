import { SchemaOf } from 'yup';
import * as yup from 'yup';

type Validation = {
  [x: string]: string;
};

const configValidationSchema = (fieldName: string): SchemaOf<Validation> =>
  yup.object({
    [fieldName]: yup
      .string()
      .strict()
      .trim('New name cannot include leading and trailing spaces')
      .min(2, 'New name must be more than 2 symbols')
      .max(30, 'Max length is 30 symbols')
      .required('New name is required')
      .matches(/^(?:[A-Za-z0-9 _]*)(?:[A-Za-z0-9 _]*)$/, 'New name must have numbers and letters')
  });

export { configValidationSchema };
