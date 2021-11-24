import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
} from 'react';
import { useFormik } from 'formik';
import {
  Dialog,
  TextField,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';

import { CardContext } from 'context/CardContext';
import {
  AlertActions,
  AlertContext,
  AlertStatusData,
} from 'context/AlertContext';
import { updateCardName } from 'services/resources/request/card';
import { configValidationSchema } from 'utils/validationSchema';
import { SubmitButton, ModalForm as Form } from '../sc';
import { CardActions } from 'services/resources/model/card.model';
import { ErrorInfo } from 'services/HttpService/types';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  cardId: string;
  cardName: string;
}

export const RenameCardModal: React.FC<Props> = ({
  isOpen,
  setModalView,
  cardId,
  cardName,
}) => {
  const { dispatch: cardDispatch } = useContext(CardContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);

  const validationSchema = configValidationSchema('newName');
  const initialValues = { newName: cardName };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({ newName }) => {
      if (cardName !== newName) {
        updateCardName({ newName: newName.trim(), cardId })
          .then((resp) =>
            cardDispatch({
              type: CardActions.PUT_UPDATED_CARD,
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
  });
  const onClose = useCallback(() => setModalView(false), []);

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center' }}>
        Change card name
      </DialogTitle>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          size="medium"
          margin="none"
          id="newName"
          name="newName"
          label="New card name"
          type="string"
          autoFocus
          defaultValue={cardName}
          onChange={formik.handleChange}
          error={formik.touched.newName && !!formik.errors.newName}
          helperText={formik.touched.newName && formik.errors.newName}
        />
        <DialogActions>
          <SubmitButton size="small" type="submit" variant="contained">
            Rename
          </SubmitButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};
