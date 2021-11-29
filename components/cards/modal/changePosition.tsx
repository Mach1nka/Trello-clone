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

import { CardContext } from 'context/CardContext';
import {
  AlertActions,
  AlertContext,
  AlertStatusData,
} from 'context/AlertContext';
import { updateCardPosition } from 'services/resources/request/card';
import { SubmitButton, ModalForm as Form } from '../../columns/sc';
import { CardActions } from 'services/resources/model/card.model';
import { ErrorInfo } from 'services/HttpService/types';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  columnId: string;
  cardId: string;
  cardPosition: number;
}

export const ChangeCardPosition: React.FC<Props> = ({
  isOpen,
  setModalView,
  columnId,
  cardId,
  cardPosition,
}) => {
  const { cards, dispatch: cardDispatch } = useContext(CardContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);

  const positionArr: number[] = cards[columnId]?.map((el) => el.position) || [];
  const initialValues = { newPosition: cardPosition };

  const formHandler = useCallback(
    (values: { newPosition: number }) => {
      if (values.newPosition !== cardPosition) {
        updateCardPosition({
          cardId,
          newPosition: values.newPosition,
          columnId,
        })
          .then((resp) =>
            cardDispatch({
              type: CardActions.PUT_CARDS,
              payload: resp.data,
            })
          )
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
    [cardPosition]
  );

  const onClose = useCallback(() => setModalView(false), []);

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center' }}>
        Change card position
      </DialogTitle>
      <Formik initialValues={initialValues} onSubmit={formHandler}>
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
              {positionArr.map((el) => (
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
