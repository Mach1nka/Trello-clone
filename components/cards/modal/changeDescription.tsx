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
import { updateCardDescription } from 'services/resources/request/card';
import { descriptionTextValidation } from '../utils';
import { SubmitButton, ModalForm as Form } from '../../columns/sc';
import { CardActions } from 'services/resources/model/card.model';
import { ErrorInfo } from 'services/HttpService/types';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  cardId: string;
  cardDescription: string;
}

export const ChangeCardDescriptionModal: React.FC<Props> = ({
  isOpen,
  setModalView,
  cardId,
  cardDescription,
}) => {
  const { dispatch: cardDispatch } = useContext(CardContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);

  const initialValues = { newDescription: cardDescription };

  const formik = useFormik({
    initialValues,
    validationSchema: descriptionTextValidation,
    onSubmit: (values) => {
      updateCardDescription({ newDescription: values.newDescription, cardId })
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
    },
  });

  const onClose = useCallback(() => setModalView(false), []);

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center' }}>
        Change card description
      </DialogTitle>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          size="medium"
          margin="none"
          id="newDescription"
          name="newDescription"
          label="New card description"
          type="string"
          autoFocus
          defaultValue={cardDescription}
          onChange={formik.handleChange}
          error={
            formik.touched.newDescription && !!formik.errors.newDescription
          }
          helperText={
            formik.touched.newDescription && formik.errors.newDescription
          }
        />
        <DialogActions>
          <SubmitButton size="small" type="submit" variant="contained">
            Change
          </SubmitButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};
