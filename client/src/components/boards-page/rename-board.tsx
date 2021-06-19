import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Dialog, DialogTitle, DialogActions, TextField, Button } from '@material-ui/core';
import { useAppSelector } from '../../store/hooks';
import { ModalForm as Form } from './sc';
import { renameBoard } from '../../store/board/actions';
import { useStyles } from './constants';
import { configValidationSchema } from './utils';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  boardId: string;
  userId: string;
}

const RenameBoardModal: React.FC<Props> = ({ isOpen, setModalView, boardId, userId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentBoardObj = useAppSelector((state) =>
    state.userBoards.ownBoards.filter((el) => el.id === boardId).pop()
  );
  const currentBoardName = currentBoardObj?.name || '';

  const validationSchema = configValidationSchema('newName');
  const initialValues = {
    newName: currentBoardName
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(renameBoard({ newName: values.newName, boardId, userId }));
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
      <DialogTitle className={classes.dialogTitle}>Change board name</DialogTitle>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          size="medium"
          margin="none"
          id="newName"
          name="newName"
          label="New board name"
          type="string"
          autoFocus
          defaultValue={currentBoardName}
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
