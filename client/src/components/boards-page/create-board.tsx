import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Dialog, DialogTitle, TextField, DialogActions, Button } from '@material-ui/core';
import { ModalForm as Form } from './sc';
import { useAppSelector } from '../../store/hooks';
import { createBoard } from '../../store/board/actions';
import { useStyles } from './constants';
import { configValidationSchema } from './utils';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
}

const CreateBoardModal: React.FC<Props> = ({ isOpen, setModalView }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useAppSelector((state) => state.authData);

  const validationSchema = configValidationSchema('boardName');
  const initialValues = {
    boardName: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(createBoard({ name: values.boardName.trim(), userId: id }));
      setModalView(false);
    }
  });

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={() => setModalView(false)}>
      <DialogTitle className={classes.dialogTitle}>Create new board</DialogTitle>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          size="medium"
          margin="none"
          id="boardName"
          name="boardName"
          label="Board name"
          type="string"
          autoFocus
          onChange={formik.handleChange}
          error={formik.touched.boardName && !!formik.errors.boardName}
          helperText={formik.touched.boardName && formik.errors.boardName}
        />
        <DialogActions>
          <Button
            classes={{ root: classes.submitButton }}
            size="small"
            type="submit"
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default CreateBoardModal;
