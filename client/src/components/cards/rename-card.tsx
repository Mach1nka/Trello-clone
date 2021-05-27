import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Dialog, TextField, DialogActions, DialogTitle, Button } from '@material-ui/core';
import { ModalForm as Form } from '../boards-page/sc';
import { renameCard } from '../../store/card/actions';
import { configValidationSchema } from '../boards-page/utils';
import { useStyles } from '../boards-page/constants';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  cardId: string;
  cardName: string;
}

const RenameCardModal: React.FC<Props> = ({ isOpen, setModalView, cardId, cardName }) => {
  const dispatch = useDispatch();
  const validationSchema = configValidationSchema('newName');
  const classes = useStyles();
  const initialValues = { newName: cardName };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(renameCard({ newName: values.newName, cardId }));
      setModalView(false);
    }
  });
  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={() => setModalView(false)}>
      <DialogTitle className={classes.dialogTitle}>Change card name</DialogTitle>
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
          <Button size="small" type="submit" color="secondary" variant="contained">
            Rename
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default RenameCardModal;
