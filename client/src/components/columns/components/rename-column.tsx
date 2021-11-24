import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Dialog, TextField, DialogActions, DialogTitle } from '@material-ui/core';

import { renameColumn } from '../../../store/column/actions';
import { configValidationSchema } from '../../boards-page/utils';
import { SubmitButton, ModalForm as Form } from '../sc';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  columnId: string;
  columnName: string;
}

const RenameColumnModal: React.FC<Props> = ({ isOpen, setModalView, columnId, columnName }) => {
  const dispatch = useDispatch();
  const validationSchema = configValidationSchema('newName');
  const initialValues = { newName: columnName };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(renameColumn({ newName: values.newName.trim(), columnId }));
      setModalView(false);
    }
  });

  const onClose = useCallback(() => setModalView(false), []);

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center' }}>Change column name</DialogTitle>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          size="medium"
          margin="none"
          id="newName"
          name="newName"
          label="New column name"
          type="string"
          autoFocus
          defaultValue={columnName}
          onChange={formik.handleChange}
          error={formik.touched.newName && !!formik.errors.newName}
          helperText={formik.touched.newName && formik.errors.newName}
        />
        <DialogActions>
          <SubmitButton size="small" type="submit" variant="contained">
            Rename
          </SubmitButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default RenameColumnModal;
