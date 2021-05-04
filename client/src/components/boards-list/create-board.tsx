import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Dialog, TextField, DialogActions, Button } from '@material-ui/core';
import { ModalBoardForm as Form } from './sc';
import { useAppSelector } from '../../store/hooks';
import { createBoard } from '../../store/board/actions';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
}

const CreateBoardModal: React.FC<Props> = ({ isOpen, setModalView }) => {
  const dispatch = useDispatch();
  const { id } = useAppSelector((state) => state.authData);
  const validationSchema = yup.object({
    boardName: yup
      .string()
      .strict()
      .trim('New name cannot include leading and trailing spaces')
      .min(5, 'New name must be more than 5 symbols')
      .max(30, 'Max length is 30 symbols')
      .required('New name is required')
      .matches(/^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/, 'New name must have numbers and letters')
  });
  const initialValues = {
    boardName: ''
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(createBoard({ name: values.boardName, userId: id }));
      setModalView(false);
    }
  });
  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={() => setModalView(false)}>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          size="medium"
          margin="normal"
          id="boardName"
          name="boardName"
          label="Board name"
          type="string"
          autoFocus
          onChange={formik.handleChange}
          error={formik.touched.boardName && !!formik.errors.boardName}
          helperText={formik.touched.boardName && formik.errors.boardName}
        />
        <DialogActions>
          <Button size="small" type="submit" color="secondary" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default CreateBoardModal;
