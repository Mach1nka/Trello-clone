import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Dialog, TextField, DialogActions, Button } from '@material-ui/core';
import { ModalForm as Form } from '../boards-page/sc';
import { renameColumn } from '../../store/column/actions';
import { configValidationSchema } from '../boards-page/constants';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  columnId: string;
}

const RenameColumnModal: React.FC<Props> = ({ isOpen, setModalView, columnId }) => {
  const dispatch = useDispatch();
  const validationSchema = configValidationSchema('newName');
  const initialValues = { newName: '' };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(renameColumn({ newName: values.newName, columnId }));
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
          label="New column name"
          type="string"
          autoFocus
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

export default RenameColumnModal;
