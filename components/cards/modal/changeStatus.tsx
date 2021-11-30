import { Dispatch, SetStateAction, useCallback, useContext } from 'react';
import { Formik } from 'formik';
import {
  Dialog,
  TextField,
  DialogActions,
  DialogTitle,
  MenuItem,
} from '@material-ui/core';

import { CardContext } from 'context/CardContext';
import { ColumnContext } from 'context/ColumnContext';
import {
  AlertActions,
  AlertContext,
  AlertStatusData,
} from 'context/AlertContext';
import { updateCardStatus } from 'services/resources/request/card';
import { SubmitButton, ModalForm as Form } from '../../columns/sc';
import { CardActions } from 'services/resources/model/card.model';
import { ErrorInfo } from 'services/HttpService/types';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  columnId: string;
  cardId: string;
}

interface SelectValue {
  columnName: string;
  columnId: string;
}

export const ChangeCardStatus: React.FC<Props> = ({
  isOpen,
  setModalView,
  columnId,
  cardId,
}) => {
  const { dispatch: cardDispatch } = useContext(CardContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const { columns } = useContext(ColumnContext);

  const columnsArr: SelectValue[] = columns.map((el) => ({
    columnName: el.name,
    columnId: el.id,
  }));

  const initialValues = { newStatus: columnId };

  const formHandler = useCallback(
    (values: { newStatus: string }) => {
      if (values.newStatus !== columnId) {
        updateCardStatus({
          cardId,
          newColumnId: values.newStatus,
          columnId,
        })
          .then((resp) => {
            cardDispatch({
              type: CardActions.PUT_CARDS,
              payload: resp.data.oldColumn,
            });
            cardDispatch({
              type: CardActions.PUT_CARDS,
              payload: resp.data.newColumn,
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
          .finally(() => onClose());
      }
    },
    [cardId, columnId]
  );

  const onClose = useCallback(() => setModalView(false), []);

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center' }}>
        Change card status
      </DialogTitle>
      <Formik initialValues={initialValues} onSubmit={formHandler}>
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <TextField
              label="Column"
              name="newStatus"
              id="newStatus"
              select
              value={props.values.newStatus}
              onChange={props.handleChange}
            >
              {columnsArr.map((el) => (
                <MenuItem key={el.columnId} value={el.columnId}>
                  {el.columnName}
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
