import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Dialog, DialogTitle, DialogActions, TextField } from '@material-ui/core';

import { useAppSelector } from '../../../store/hooks';
import { renameBoard } from '../../../store/board/actions';
import { configValidationSchema } from '../utils';
import { ModalForm as Form, SubmitButton } from '../sc';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  boardId: string;
  userId: string;
}

const RenameBoardModal: React.FC<Props> = ({ isOpen, setModalView, boardId, userId }) => {
  const dispatch = useDispatch();
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
      dispatch(renameBoard({ newName: values.newName.trim(), boardId, userId }));
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
      <DialogTitle style={{ textAlign: 'center' }}>Change board name</DialogTitle>
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
          <SubmitButton size="small" type="submit" variant="contained">
            Save
          </SubmitButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default RenameBoardModal;
