import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Dialog, TextField, DialogActions, DialogTitle } from '@material-ui/core';

import { renameCard } from '../../../store/actions/card';
import { setModalsStates } from '../../../store/actions/modal';
import { configValidationSchema } from '../../home/utils';
import { SubmitButton, ModalForm as Form } from '../sc';

interface Props {
  isOpen: boolean;
  cardId: string;
  cardName: string;
}

const RenameCardModal: React.FC<Props> = ({ isOpen, cardId, cardName }) => {
  const dispatch = useDispatch();

  const validationSchema = configValidationSchema('newName');
  const initialValues = { newName: cardName };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(renameCard({ newName: values.newName.trim(), cardId }));
      dispatch(setModalsStates({ isRenameModalVisible: false }));
    }
  });
  const onClose = useCallback(() => dispatch(setModalsStates({ isRenameModalVisible: false })), []);

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center' }}>Change card name</DialogTitle>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          size="medium"
          margin="none"
          id="newName"
          name="newName"
          label="New card name"
          type="string"
          autoFocus
          defaultValue={cardName}
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

export default RenameCardModal;
