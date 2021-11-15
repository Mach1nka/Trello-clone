import {
  useState,
  useCallback,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { Formik } from 'formik';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { AlertActions, AlertStatusData } from 'context/AlertContext';
import { AlertContext } from 'context/AlertContext';
import { useLoadUsers } from 'utils/loadUsers';
import { shareBoard } from 'services/resources/request/board';
import { ShareModalForm as Form, BoardSC as SC, SubmitButton } from './sc';
import { ErrorInfo } from 'services/HttpService/types';
import { User } from 'services/resources/model/user.model';

interface Props {
  modalView: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  boardId: string;
}

export const ShareBoardModal: React.FC<Props> = ({
  modalView,
  setModalView,
  boardId,
}) => {
  const { alerts, dispatch: alertDispatch } = useContext(AlertContext);
  const [searchUserLogin, setUserLogin] = useState('');
  const users = useLoadUsers(searchUserLogin);

  const formHandler = useCallback(
    (values: { userId: string }) => {
      setUserLogin('');
      shareBoard({ boardId, userId: values.userId })
        .then(() => {
          alertDispatch({
            type: AlertActions.ADD,
            payload: {
              id: `${alerts.length}-${boardId}`,
              message: 'Board has shared successfully',
              status: AlertStatusData.SUCCESS,
            },
          });
        })
        .catch((err: ErrorInfo) => {
          alertDispatch({
            type: AlertActions.ADD,
            payload: {
              id: `${alerts.length}-${boardId}`,
              message: err.message,
              status: AlertStatusData.ERROR,
            },
          });
        })
        .finally(() => setModalView(false));
    },
    [boardId]
  );

  const onClose = useCallback(() => {
    // setUserLogin('');
    // dispatch(setBoardIdForModal({ boardId: '' }));
    setModalView(false);
  }, []);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={modalView}
      onClick={(evt) => evt.stopPropagation()}
      onClose={onClose}
    >
      <DialogTitle style={{ textAlign: 'center' }}>Share board</DialogTitle>
      <Formik initialValues={{ userId: '' }} onSubmit={formHandler}>
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <SC.Autocomplete
              options={users}
              id="userId"
              onChange={(_e, value) => props.setFieldValue('userId', value?.id)}
              getOptionLabel={(option) => option.login}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(event) =>
                    setTimeout(() => setUserLogin(event.target.value), 500)
                  }
                  label="Choose user"
                  variant="outlined"
                />
              )}
            />
            <DialogActions>
              <SubmitButton type="submit" variant="contained">
                Share
              </SubmitButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
