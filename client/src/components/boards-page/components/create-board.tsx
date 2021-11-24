import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Dialog, DialogTitle, TextField, DialogActions } from '@material-ui/core';

import { useAppSelector } from '../../../store/hooks';
import { createBoard } from '../../../store/board/actions';
import { configValidationSchema } from '../utils';
import { ModalForm as Form, SubmitButton } from '../sc';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
}

const CreateBoardModal: React.FC<Props> = ({ isOpen, setModalView }) => {
  const dispatch = useDispatch();
  const { id } = useAppSelector((state) => state.authData);

  const validationSchema = configValidationSchema('boardName');
  const initialValues = {
    boardName: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(createBoard({ name: values.boardName.trim(), userId: id }));
      setModalView(false);
    }
  });

  const hideCreatingModal = useCallback(() => setModalView(false), []);

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={hideCreatingModal}>
      <DialogTitle style={{ textAlign: 'center' }}>Create new board</DialogTitle>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          size="medium"
          margin="none"
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
          <SubmitButton size="small" type="submit" variant="contained">
            Create
          </SubmitButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default CreateBoardModal;
