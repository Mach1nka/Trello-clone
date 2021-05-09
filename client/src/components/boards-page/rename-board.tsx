import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Dialog, DialogActions, TextField, Button } from '@material-ui/core';
import { ModalForm as Form } from './sc';
import { renameBoard } from '../../store/board/actions';
import { configValidationSchema } from './constants';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  boardId: string;
}

const RenameBoardModal: React.FC<Props> = ({ isOpen, setModalView, boardId }) => {
  const dispatch = useDispatch();
  const validationSchema = configValidationSchema('newName');
  const initialValues = { newName: '' };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(renameBoard({ newName: values.newName, boardId }));
      setModalView(false);
    }
  });
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClick={(evt) => evt.stopPropagation()}
      onClose={() => setModalView(false)}
    >
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
