import React, { Dispatch, SetStateAction } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Dialog, DialogActions, DialogTitle, TextField, Button } from '@material-ui/core';
import { RenameBoardForm as Form } from './sc';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  currentBoardName: string;
}

const RenameBoardModal: React.FC<Props> = ({ isOpen, setModalView, currentBoardName }) => {
  const validationSchema = yup.object({
    newName: yup
      .string()
      .strict()
      .trim('New name cannot include leading and trailing spaces')
      .min(5, 'New name must be more than 5 symbols')
      .max(50, 'Max length is 50 symbols')
      .required('New name is required')
      .matches(/^[a-zA-Z0-9]+$/, 'New name must have numbers and letters')
  });
  const initialValues = {
    newName: ''
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log({ newName: values.newName });
      setModalView(false);
    }
  });
  return (
    <Dialog open={isOpen} onClose={() => setModalView(false)}>
      <DialogTitle>Current name: {currentBoardName}</DialogTitle>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          size="medium"
          margin="normal"
          id="newName"
          name="newName"
          label="New board name"
          type="string"
          autoFocus
          onChange={formik.handleChange}
          error={formik.touched.newName && !!formik.errors.newName}
          helperText={formik.touched.newName && formik.errors.newName}
        />
        <DialogActions>
          <Button size="small" type="submit" color="secondary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default RenameBoardModal;
