import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Dialog, DialogActions, TextField, Button } from '@material-ui/core';
import { ModalBoardForm as Form } from './sc';
import { renameBoard } from '../../store/board/actions';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  boardId: string;
}

const RenameBoardModal: React.FC<Props> = ({ isOpen, setModalView, boardId }) => {
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    newName: yup
      .string()
      .strict()
      .trim('New name cannot include leading and trailing spaces')
      .min(5, 'New name must be more than 5 symbols')
      .max(30, 'Max length is 30 symbols')
      .required('New name is required')
      .matches(/^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/, 'New name must have numbers and letters')
  });
  const initialValues = {
    newName: ''
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(renameBoard({ newName: values.newName, boardId }));
      setModalView(false);
    }
  });
  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={() => setModalView(false)}>
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
