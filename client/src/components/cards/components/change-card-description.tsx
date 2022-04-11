import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Dialog, TextField, DialogActions, DialogTitle } from '@material-ui/core';

import { changeCardDescription } from '../../../store/actions/card';
import { descriptionTextValidation } from '../utils';
import { SubmitButton, ModalForm as Form } from '../sc';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  cardId: string;
  cardDescription: string;
}

const ChangeCardDescriptionModal: React.FC<Props> = ({
  isOpen,
  setModalView,
  cardId,
  cardDescription
}) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { newDescription: cardDescription },
    validationSchema: descriptionTextValidation,
    onSubmit: (values) => {
      dispatch(changeCardDescription({ newDescription: values.newDescription, cardId }));
      setModalView(false);
    }
  });

  const onClose = useCallback(() => setModalView(false), []);

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center' }}>Change card description</DialogTitle>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          size="medium"
          margin="none"
          id="newDescription"
          name="newDescription"
          label="New card description"
          type="string"
          autoFocus
          defaultValue={cardDescription}
          onChange={formik.handleChange}
          error={formik.touched.newDescription && !!formik.errors.newDescription}
          helperText={formik.touched.newDescription && formik.errors.newDescription}
        />
        <DialogActions>
          <SubmitButton size="small" type="submit" variant="contained">
            Change
          </SubmitButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default ChangeCardDescriptionModal;
