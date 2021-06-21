import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Dialog, TextField, DialogActions, DialogTitle, Button } from '@material-ui/core';
import { ModalForm as Form } from '../../boards-page/sc';
import { renameColumn } from '../../../store/column/actions';
import { configValidationSchema } from '../../boards-page/utils';
import { useStyles } from '../../boards-page/constants';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  columnId: string;
  columnName: string;
}

const RenameColumnModal: React.FC<Props> = ({ isOpen, setModalView, columnId, columnName }) => {
  const dispatch = useDispatch();
  const validationSchema = configValidationSchema('newName');
  const classes = useStyles();
  const initialValues = { newName: columnName };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(renameColumn({ newName: values.newName.trim(), columnId }));
      setModalView(false);
    }
  });
  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={() => setModalView(false)}>
      <DialogTitle className={classes.dialogTitle}>Change column name</DialogTitle>
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
          <Button
            size="small"
            type="submit"
            classes={{ root: classes.submitButton }}
            variant="contained"
          >
            Rename
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default RenameColumnModal;
