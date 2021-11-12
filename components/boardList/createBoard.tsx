import { Dispatch, SetStateAction, useCallback, useContext } from 'react';
import { useFormik } from 'formik';
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
} from '@material-ui/core';

import { ErrorInfo } from 'services/HttpService/types';
import { createBoard } from 'services/resources/request/board';
import { configValidationSchema } from './utils';
import { ModalForm as Form, SubmitButton } from './sc';
import { BoardActions } from 'services/resources/model/board.model';
import { AuthContext } from 'context/AuthContext';
import { BoardContext } from 'context/BoardContext';
import {
  AlertContext,
  AlertActions,
  AlertStatusData,
} from 'context/AlertContext';
import { LoaderContext } from 'context/LoaderContext';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
}

export const CreateBoardModal: React.FC<Props> = ({ isOpen, setModalView }) => {
  const { user } = useContext(AuthContext);
  const { alerts, dispatch: alertDispatch } = useContext(AlertContext);
  const { dispatch: boardDispatch } = useContext(BoardContext);
  const { setLoaderState } = useContext(LoaderContext);

  const validationSchema = configValidationSchema('boardName');
  const initialValues = {
    boardName: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setLoaderState(true);
      //  @note Type of user must be improved in further. Fields must be string after authorization
      createBoard({ name: values.boardName.trim(), userId: user.id as string })
        .then((resp) => {
          boardDispatch({
            type: BoardActions.PUT_CREATED_BOARD,
            payload: resp.data,
          });
          alertDispatch({
            type: AlertActions.ADD,
            payload: {
              id: `${alerts.length}-${user.id}`,
              message: 'Board has created successfully',
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
          setLoaderState(false);
          setModalView(false);
        });
    },
  });

  const hideCreatingModal = useCallback(() => setModalView(false), []);

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={hideCreatingModal}>
      <DialogTitle style={{ textAlign: 'center' }}>
        Create new board
      </DialogTitle>
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
          <SubmitButton size="small" type="submit" variant="contained">
            Create
          </SubmitButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};
