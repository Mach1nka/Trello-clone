import {
  useState,
  useCallback,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { useFormik } from 'formik';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

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
} from 'services/resources/request/card';
import { CardActions } from 'services/resources/model/card.model';
import { ErrorInfo } from 'services/HttpService/types';
import { configValidationSchema } from '../utils';
import { CardSC as SC } from '../sc';

interface Props {
  cardName: string;
  cardId: string;
  columnId: string;
  cardDescription: string;
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  setStatusModalView: Dispatch<SetStateAction<boolean>>;
}

export const CardDetails: React.FC<Props> = ({
  cardName,
  cardDescription,
  isOpen,
  setModalView,
  setStatusModalView,
  cardId,
  columnId,
}) => {
  const { dispatch: cardDispatch } = useContext(CardContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const { columns } = useContext(ColumnContext);

  const [isNameFocused, setIsNamedFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const columnName = columns.find((el) => el.id === columnId)?.name || '';
  const initialValues = { name: cardName, description: cardDescription };
  const validationSchema = configValidationSchema;

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      if (values.name !== formik.initialValues.name) {
        updateCardName({ newName: values.name.trim(), cardId })
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
          });
      }
      if (values.description !== formik.initialValues.description) {
        updateCardDescription({ newDescription: values.description, cardId })
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
          });
      }
    },
  });

  const onClose = useCallback(() => setModalView(false), []);

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

  const handleDeleteCard = useCallback(() => {
    deleteCard({ columnId, cardId })
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

  const showStatusModal = useCallback(() => setStatusModalView(true), []);

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={onClose}>
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
        <Typography variant="body2">
          It is in column
          <SC.ColumnNameButton onClick={showStatusModal}>
            {columnName}
          </SC.ColumnNameButton>
        </Typography>
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
