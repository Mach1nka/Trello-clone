import { makeStyles } from '@material-ui/core';
import { SchemaOf } from 'yup';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    backgroundColor: theme.palette.primary.contrastText,
    minHeight: '40vh',
    marginTop: '5%',
    padding: '30px',
    boxSizing: 'border-box'
  },
  boardName: {
    maxHeight: '80%',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  editBoardNameButton: {
    width: '22px !important',
    height: '22px !important',
    minHeight: 'unset !important'
  }
}));

type Validation = {
  [x: string]: string;
};

const configValidationSchema = (fieldName: string): SchemaOf<Validation> =>
  yup.object({
    [fieldName]: yup
      .string()
      .strict()
      .trim('New name cannot include leading and trailing spaces')
      .min(5, 'New name must be more than 5 symbols')
      .max(30, 'Max length is 30 symbols')
      .required('New name is required')
      .matches(/^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/, 'New name must have numbers and letters')
  });

export { useStyles, configValidationSchema };
