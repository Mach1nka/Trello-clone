import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Dialog, TextField, DialogActions, DialogTitle, Button } from '@material-ui/core';
import { ModalForm as Form } from '../boards-page/sc';
import { changeCardDescription } from '../../store/card/actions';
import { useStyles } from '../boards-page/constants';

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
  const classes = useStyles();

  const validationSchema = yup.object({
    newDescription: yup
      .string()
      .strict()
      .trim('Description cannot include leading and trailing spaces')
      .min(2, 'Description must be more than 2 symbols')
      .max(150, 'Max length is 150 symbols')
      .required('Description is required')
      .matches(/^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/, 'New name must have numbers and letters')
  });
  const initialValues = { newDescription: cardDescription };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(changeCardDescription({ newDescription: values.newDescription, cardId }));
      setModalView(false);
    }
  });
  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={() => setModalView(false)}>
      <DialogTitle className={classes.dialogTitle}>Change card description</DialogTitle>
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
          <Button size="small" type="submit" color="secondary" variant="contained">
            Change
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default ChangeCardDescriptionModal;
