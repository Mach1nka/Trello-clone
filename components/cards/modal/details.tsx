import { useState, useCallback, useContext } from 'react';
import { useFormik } from 'formik';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  IconButton,
  MenuItem,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { ModalContext, ModalActions } from 'context/ModalContext';
import { CardContext } from 'context/CardContext';
import { ColumnContext } from 'context/ColumnContext';
import {
  AlertActions,
  AlertContext,
  AlertStatusData,
} from 'context/AlertContext';
import {
  updateCardDescription,
  updateCardName,
  deleteCard,
  updateCardStatus,
} from 'services/resources/request/card';
import { Card, CardActions } from 'services/resources/model/card.model';
import { BaseResponse, ErrorInfo } from 'services/HttpService/types';
import { configValidationSchema } from '../utils';
import { CardSC as SC } from '../sc';

interface SelectValue {
  columnName: string;
  columnId: string;
}

export const CardDetails: React.FC = () => {
  const {
    cardId,
    columnId,
    cardDescription,
    cardName,
    isDisplay,
    dispatch: modalDispatch,
  } = useContext(ModalContext);
  const { dispatch: cardDispatch } = useContext(CardContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const { columns } = useContext(ColumnContext);

  const [isNameFocused, setIsNamedFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const currentColumn = columns.find((el) => el.id === columnId)?.id || '';
  const columnsArr: SelectValue[] = columns.map((el) => ({
    columnName: el.name,
    columnId: el.id,
  }));
  const initialValues = {
    name: cardName,
    description: cardDescription,
    status: currentColumn,
  };
  const validationSchema = configValidationSchema;

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      if (values.name !== formik.initialValues.name) {
        updateCardName({ newName: values.name.trim(), cardId })
          .then(({ data }: BaseResponse<Card>) => {
            cardDispatch({
              type: CardActions.PUT_UPDATED_CARD,
              payload: data,
            });
            modalDispatch({
              type: ModalActions.PUT_DETAILS,
              payload: {
                cardName: data.name,
                cardId: data.id,
                columnId: data.columnId,
                cardDescription: data.description,
              },
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
          });
        return;
      }
      if (values.description !== formik.initialValues.description) {
        updateCardDescription({ newDescription: values.description, cardId })
          .then(({ data }: BaseResponse<Card>) => {
            cardDispatch({
              type: CardActions.PUT_UPDATED_CARD,
              payload: data,
            });
            modalDispatch({
              type: ModalActions.PUT_DETAILS,
              payload: {
                cardName: data.name,
                cardId: data.id,
                columnId: data.columnId,
                cardDescription: data.description,
              },
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
          });
        return;
      }
      if (values.status !== formik.initialValues.status) {
        updateCardStatus({
          cardId,
          newColumnId: values.status,
          columnId: initialValues.status,
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

            const updatedCard: Card | undefined =
              resp.data.newColumn.cards.find((el) => el.id === cardId);

            if (updatedCard) {
              modalDispatch({
                type: ModalActions.PUT_DETAILS,
                payload: {
                  cardName: updatedCard.name,
                  cardId: updatedCard.id,
                  columnId: updatedCard.columnId,
                  cardDescription: updatedCard.description,
                },
              });
              return;
            }
            onClose();
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
          });
      }
    },
  });

  const onClose = useCallback(() => {
    modalDispatch({ type: ModalActions.UPDATE_DISPLAY, payload: false });
    modalDispatch({ type: ModalActions.RESET });
  }, []);

  const blurName = useCallback(() => {
    setIsNamedFocused(false);
    formik.submitForm();
  }, []);

  const blurDescription = useCallback(() => {
    setIsDescriptionFocused(false);
    formik.submitForm();
  }, []);

  const focusName = useCallback(() => setIsNamedFocused(true), []);

  const focusDescription = useCallback(() => setIsDescriptionFocused(true), []);

  const handleStatusChange = useCallback((value: string) => {
    formik.setFieldValue('status', value);
    formik.submitForm();
  }, []);

  const handleDeleteCard = useCallback(() => {
    deleteCard({ columnId: columnId, cardId: cardId })
      .then((resp) =>
        cardDispatch({ type: CardActions.PUT_CARDS, payload: resp.data })
      )
      .catch((err: ErrorInfo) =>
        alertDispatch({
          type: AlertActions.ADD,
          payload: {
            id: `${Date.now()}`,
            message: err.message,
            status: AlertStatusData.ERROR,
          },
        })
      )
      .finally(() => onClose());
  }, [cardId]);

  return (
    <Dialog fullWidth maxWidth="sm" open={isDisplay} onClose={onClose}>
      <DialogTitle>
        {!isNameFocused ? (
          <SC.Name onClick={focusName}>{formik.values.name}</SC.Name>
        ) : (
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <SC.NameField
              id="name"
              name="name"
              autoFocus
              fullWidth
              defaultValue={cardName}
              onChange={formik.handleChange}
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
              onBlur={blurName}
            />
          </form>
        )}
        <SC.ColumnInfo>
          <Typography variant="body2">It is in column</Typography>
          <SC.ColumnSelect
            id="column-select"
            select
            value={formik.values.status}
            onChange={(event) => handleStatusChange(event.target.value)}
          >
            {columnsArr.map((option) => (
              <MenuItem key={option.columnId} value={option.columnId}>
                {option.columnName}
              </MenuItem>
            ))}
          </SC.ColumnSelect>
        </SC.ColumnInfo>
      </DialogTitle>
      <DialogContent>
        <Typography variant="button">Description</Typography>
        <div>
          {isDescriptionFocused || !cardDescription ? (
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <SC.DescriptionField
                id="description"
                name="description"
                autoFocus={isDescriptionFocused}
                fullWidth
                placeholder={!cardDescription ? 'Add description' : ''}
                InputProps={{ inputComponent: 'textarea' }}
                variant="filled"
                defaultValue={cardDescription}
                onChange={formik.handleChange}
                error={
                  formik.touched.description && !!formik.errors.description
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                onBlur={blurDescription}
              />
            </form>
          ) : (
            <SC.DescriptionText onClick={focusDescription}>
              {formik.values.description}
            </SC.DescriptionText>
          )}
        </div>
      </DialogContent>
      <SC.DialogActions>
        <IconButton aria-label="delete card" onClick={handleDeleteCard}>
          <DeleteIcon color="error" />
        </IconButton>
        <Button onClick={onClose}>close</Button>
      </SC.DialogActions>
    </Dialog>
  );
};
