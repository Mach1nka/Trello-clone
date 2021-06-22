import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Dialog, TextField, DialogActions, DialogTitle, Button } from '@material-ui/core';
import { ModalForm as Form } from '../../boards-page/sc';
import { createColumn } from '../../../store/column/actions';
import { configValidationSchema } from '../../boards-page/utils';
import { useStyles } from '../../boards-page/constants';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  boardId: string;
  newPosition: number;
}

const CreateColumnModal: React.FC<Props> = ({ isOpen, setModalView, boardId, newPosition }) => {
  const dispatch = useDispatch();
  const validationSchema = configValidationSchema('name');
  const classes = useStyles();
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
      <DialogTitle className={classes.dialogTitle}>Create new column</DialogTitle>
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
          <Button
            size="small"
            type="submit"
            classes={{ root: classes.submitButton }}
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default CreateColumnModal;
