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
  },
  dialogTitle: {
    textAlign: 'center'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
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
      .min(2, 'New name must be more than 2 symbols')
      .max(30, 'Max length is 30 symbols')
      .required('New name is required')
      .matches(/^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/, 'New name must have numbers and letters')
  });

export { useStyles, configValidationSchema };
