import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Dialog, TextField, DialogActions, DialogTitle } from '@material-ui/core';

import { createColumn } from '../../../store/column/actions';
import { configValidationSchema } from '../../boards-page/utils';
import { SubmitButton, ModalForm as Form } from '../sc';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  boardId: string;
  newPosition: number;
}

const CreateColumnModal: React.FC<Props> = ({ isOpen, setModalView, boardId, newPosition }) => {
  const dispatch = useDispatch();
  const validationSchema = configValidationSchema('name');
  const initialValues = { name: '' };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(createColumn({ name: values.name.trim(), boardId, position: newPosition }));
      setModalView(false);
    }
  });
  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={() => setModalView(false)}>
      <DialogTitle style={{ textAlign: 'center' }}>Create new column</DialogTitle>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          size="medium"
          margin="none"
          id="name"
          name="name"
          label="Column name"
          type="string"
          autoFocus
          onChange={formik.handleChange}
          error={formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
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

export default CreateColumnModal;
