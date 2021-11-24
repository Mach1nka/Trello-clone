import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
} from 'react';
import { Formik } from 'formik';
import {
  Dialog,
  TextField,
  DialogActions,
  DialogTitle,
  MenuItem,
} from '@material-ui/core';

import {
  AlertContext,
  AlertActions,
  AlertStatusData,
} from 'context/AlertContext';
import { ColumnContext } from 'context/ColumnContext';
import { updateColumnPosition } from 'services/resources/request/column';
import { SubmitButton, ModalForm as Form } from '../sc';
import { ColumnActions } from 'services/resources/model/column.model';
import { ErrorInfo } from 'services/HttpService/types';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  columnId: string;
  boardId: string;
  position: number;
}

export const ChangeColumnPosition: React.FC<Props> = ({
  isOpen,
  setModalView,
  columnId,
  boardId,
  position,
}) => {
  const { columns, dispatch: columnDispatch } = useContext(ColumnContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);

  const columnPositions: number[] = columns.map((el) => el.position);

  const formHandler = useCallback(
    (values: { newPosition: number }) => {
      if (values.newPosition !== position) {
        updateColumnPosition({
          boardId,
          newPosition: values.newPosition,
          columnId,
        })
          .then((resp) => {
            columnDispatch({
              type: ColumnActions.PUT_COLUMNS,
              payload: resp.data,
            });
          })
          .catch((err: ErrorInfo) => {
            alertDispatch({
              type: AlertActions.ADD,
              payload: {
                id: `${Date.now()}`,
                message: err.message,
                status: AlertStatusData.ERROR,
              },
            });
          })
          .finally(() => setModalView(false));
      }
    },
    [position]
  );

  const onClose = useCallback(() => setModalView(false), []);

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center' }}>
        Change column position
      </DialogTitle>
      <Formik initialValues={{ newPosition: position }} onSubmit={formHandler}>
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <TextField
              label="Position"
              name="newPosition"
              id="newPosition"
              select
              value={props.values.newPosition}
              onChange={props.handleChange}
            >
              {columnPositions.map((el) => (
                <MenuItem key={el} value={el}>
                  {el + 1}
                </MenuItem>
              ))}
            </TextField>
            <DialogActions>
              <SubmitButton size="small" type="submit" variant="contained">
                Change
              </SubmitButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
