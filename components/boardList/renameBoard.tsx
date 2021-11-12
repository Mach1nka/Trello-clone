import { Dispatch, SetStateAction, useCallback, useContext } from 'react';
import { useFormik } from 'formik';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
} from '@material-ui/core';

import { ErrorInfo } from 'services/HttpService/types';
import { updateBoardName } from 'services/resources/request/board';
import { BoardActions } from 'services/resources/model/board.model';
import { BoardContext } from 'context/BoardContext';
import {
  AlertContext,
  AlertActions,
  AlertStatusData,
} from 'context/AlertContext';
import { LoaderContext } from 'context/LoaderContext';
import { configValidationSchema } from './utils';
import { ModalForm as Form, SubmitButton } from './sc';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  boardId: string;
  userId: string;
}

export const RenameBoardModal: React.FC<Props> = ({
  isOpen,
  setModalView,
  boardId,
  userId,
}) => {
  const { alerts, dispatch: alertDispatch } = useContext(AlertContext);
  const { ownBoards, dispatch: boardDispatch } = useContext(BoardContext);
  const { setLoaderState } = useContext(LoaderContext);

  const currentBoard = ownBoards.filter((el) => el.id === boardId).pop();
  const currentBoardName = currentBoard?.name || '';

  const validationSchema = configValidationSchema('newName');
  const initialValues = {
    newName: currentBoardName,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setLoaderState(true);
      updateBoardName({ newName: values.newName.trim(), boardId, userId })
        .then((resp) => {
          boardDispatch({
            type: BoardActions.PUT_RENAMED_BOARD,
            payload: resp.data,
          });
          alertDispatch({
            type: AlertActions.ADD,
            payload: {
              id: `${alerts.length}-${boardId}`,
              message: 'Board has renamed successfully',
              status: AlertStatusData.SUCCESS,
            },
          });
        })
        .catch((err: ErrorInfo) => {
          alertDispatch({
            type: AlertActions.ADD,
            payload: {
              id: `${alerts.length}-${err.message}`,
              message: err.message,
              status: AlertStatusData.ERROR,
            },
          });
        })
        .finally(() => {
          setModalView(false);
          setLoaderState(false);
        });
    },
  });

  const onClose = useCallback(() => setModalView(false), []);
  const onClick = useCallback((evt) => evt.stopPropagation(), []);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClick={onClick}
      onClose={onClose}
    >
      <DialogTitle style={{ textAlign: 'center' }}>
        Change board name
      </DialogTitle>
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
